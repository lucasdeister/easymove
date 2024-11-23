import express, { Request, Response, Router } from "express";
import * as rideController from "../controllers/rideController.js";

const routes: Router = express.Router();

// Rota Estimar ride
routes.post("/estimate", (req: Request, res: Response) => {      
  const { customer_id, origin, destination } = req.body;

  console.log("recebeu request");

  if ((!customer_id || !origin || !destination) || (origin === destination)) {
    console.log("request inválido");
    return res.status(400).json({ 
      error_code: "INVALID_DATA", error_description: "Os dados fornecidos no corpo da requisição são inválidos"
     });
  }

  console.log("request válido");

  const response = rideController.calcularEstimativa(origin, destination);

  console.log("resposta pronta" + response);

  return res.json(response).status(200);
});

// Confirmar ride
routes.post("/confirm", async (req: Request, res: Response) => {
  const { customer_id, origin, destination, distance, duration, driver, value } = req.body; 

  const validationResult = rideController.confirmValidations(customer_id, origin, destination, distance, driver);

  if (validationResult.statusCode === 200) {
    rideController.salvarRide(customer_id, origin, destination, distance, duration, driver, value);
  }

  return res.json(validationResult.body).status(validationResult.statusCode);
});

class GetRideResponse {
  id: number;
  date: string;
  origin: string;
  destination: string;
  distance: number;
  duration: number;
  driver: {
    id: number;
    name: string;
  };
  value: number;

  constructor(id: number, date: string, origin: string, destination: string, distance: number, duration: number, driver: { id: number; name: string }, value: number) {
    this.id = id;
    this.date = date;
    this.origin = origin;
    this.destination = destination;
    this.distance = distance;
    this.duration = duration;
    this.driver = {
      id: driver.id,
      name: driver.name
    };
    this.value = value;
  }
}

// Get rides
routes.get("/:customer_id", async (req: Request, res: Response) => {
  const { customer_id } = req.params;
  const { driver_id } = req.query;

  if (!customer_id) {
    return res.status(404).json({ error_code: "NO_RIDES_FOUND", error_description: "Nenhum registro" });
  }      

  const ridesResult = rideController.getRides(Number(customer_id), Number(driver_id));

  if (!ridesResult) {
    return res.status(400).json({ error_code: "INVALID_DRIVER", error_description: "Motorista invalido" });
  }

  const rides = ridesResult.map(ride => new GetRideResponse(
    ride.id,
    ride.date,
    ride.origin,
    ride.destination,
    ride.distance,
    ride.duration,
    ride.driver,
    ride.value
  ));

  console.log(rides);

  return res.json({
    customer_id,
    rides
  }).status(200);
});

export default routes;