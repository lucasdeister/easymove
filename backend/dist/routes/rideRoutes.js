var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
import rideController from "../controllers/rideController.js";
const routes = express.Router();
// Rota Estimar ride
routes.post("/estimate", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { customer_id, origin, destination } = req.body;
    if (!customer_id || !origin || !destination || origin === destination) {
        return res.status(400).json({
            error_code: "INVALID_DATA",
            error_description: "Os dados fornecidos no corpo da requisição são inválidos",
        });
    }
    const response = yield rideController.calcularEstimativa(origin, destination);
    console.log(response);
    return res.status(200).json(response);
}));
// Confirmar ride
routes.post("/confirm", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { customer_id, origin, destination, distance, duration, driver, value } = req.body;
    console.log(req.body);
    const validationResult = yield rideController.confirmRouteValidations(customer_id, origin, destination, distance, driver);
    if (validationResult.statusCode === 200) {
        yield rideController.salvarRide(customer_id, origin, destination, distance, duration, driver, value);
    }
    return res.status(validationResult.statusCode).json(validationResult.body);
}));
// Classe de resposta para get rides
class RideResponse {
    constructor(id, date, origin, destination, distance, duration, driver, value) {
        this.id = id;
        this.date = date;
        this.origin = origin;
        this.destination = destination;
        this.distance = distance;
        this.duration = duration;
        this.driver = driver;
        this.value = value;
    }
}
// Get rides
routes.get("/:customer_id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const customer_id = Number(req.params.customer_id);
    const driver_id = Number(req.query.driver_id);
    console.log(customer_id);
    console.log(driver_id);
    if (!customer_id) {
        return res.status(404).json({
            error_code: "NO_RIDES_FOUND",
            error_description: "Nenhum registro",
        });
    }
    const ridesResult = yield rideController.getRides(customer_id, driver_id);
    if (!ridesResult) {
        return res.status(400).json({
            error_code: "INVALID_DRIVER",
            error_description: "Motorista inválido",
        });
    }
    const rides = ridesResult.map((ride) => new RideResponse(ride.id, ride.date, ride.origin, ride.destination, ride.distance, ride.duration, { id: ride.driverId, name: ride.driverName }, ride.value));
    console.log(rides);
    return res.status(200).json({
        customer_id,
        rides,
    });
}));
export default routes;
