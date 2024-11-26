var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from "../../node_modules/axios/index.js";
import dbController from "./dbController.js";
const API_KEY = "AIzaSyBhZVwamaETSI7LaUQCbvpiQcsCs8fAFV0";
const BASE_URL = "https://routes.googleapis.com/directions/v2:computeRoutes";
class Option {
    constructor(id, name, description, vehicle, rating, comment, value) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.vehicle = vehicle;
        this.review = { rating, comment };
        this.value = value;
    }
}
// Funções
function salvarRide(customer_id, origin, destination, distance, duration, driver, value) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield dbController.saveRide(customer_id, origin, destination, distance, duration, { id: driver.id, nome: driver.name }, value);
    });
}
function getRides(customer_id, driver_id) {
    return __awaiter(this, void 0, void 0, function* () {
        if (driver_id) {
            return yield dbController.getRidesbyCustomerIdDriverId(customer_id, driver_id);
        }
        else {
            return yield dbController.getRidesbyCustomerId(customer_id);
        }
    });
}
function calcularEstimativa(origin, destination) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield getTravel(origin, destination);
        const km = data.distancia / 1000;
        const options = [];
        const motoristas = yield dbController.getAllDriversAvailableForTravel(km);
        motoristas.forEach(driver => {
            const valorTotal = (driver.taxaPorKm) * km;
            options.push(new Option(driver.id, driver.nome, driver.descricao, driver.carro, driver.rating, driver.comment, valorTotal));
        });
        return {
            origin: data.origin,
            destination: data.destination,
            distance: data.distancia,
            duration: data.tempo,
            options,
            routeResponse: data.routeResponse,
        };
    });
}
function getGoogleRoute(origin, destination) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const response = yield axios.post(BASE_URL, {
                origin: { address: origin },
                destination: { address: destination },
                travelMode: "DRIVE"
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "X-Goog-Api-Key": API_KEY,
                    "X-Goog-FieldMask": "routes",
                },
            });
            return response.data;
        }
        catch (error) {
            console.error("Google route request error:", ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message);
            return error;
        }
    });
}
function getTravel(origin, destination) {
    return __awaiter(this, void 0, void 0, function* () {
        const route = yield getGoogleRoute(origin, destination);
        if (!route)
            throw new Error("Route not found");
        const tempo = route.routes[0].legs[0].duration;
        const distancia = route.routes[0].legs[0].distanceMeters;
        const coordOrigin = {
            latitude: route.routes[0].legs[0].startLocation.latLng.latitude,
            longitude: route.routes[0].legs[0].startLocation.latLng.longitude
        };
        const coordDestination = {
            latitude: route.routes[0].legs[0].endLocation.latLng.latitude,
            longitude: route.routes[0].legs[0].endLocation.latLng.longitude
        };
        return { origin: coordOrigin, destination: coordDestination, distancia, tempo, routeResponse: route };
    });
}
function getMotorista(id_driver, nome_driver) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield dbController.getAllDriversByIdName(id_driver, nome_driver);
    });
}
function createResponse(statusCode, data) {
    return { statusCode, body: JSON.stringify(data) };
}
const successResponse = createResponse(200, { success: true });
const invalidDataResponse = createResponse(400, {
    error_code: "INVALID_DATA",
    error_description: "Os dados fornecidos no corpo da requisição são inválidos",
});
const driverNotFoundResponse = createResponse(404, {
    error_code: "DRIVER_NOT_FOUND",
    error_description: "Motorista não encontrado",
});
const invalidDistanceResponse = createResponse(406, {
    error_code: "INVALID_DISTANCE",
    error_description: "Quilometragem inválida para o motorista",
});
function confirmRouteValidations(customer_id, origin, destination, distance, driver) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!origin || !destination || !customer_id || origin === destination) {
            return invalidDataResponse;
        }
        const validDrivers = yield getMotorista(driver.id, driver.name);
        if (!validDrivers) {
            return driverNotFoundResponse;
        }
        if (distance < (validDrivers.kmMinimo || 0)) {
            return invalidDistanceResponse;
        }
        return successResponse;
    });
}
export default {
    calcularEstimativa,
    salvarRide,
    confirmRouteValidations,
    getRides,
};
