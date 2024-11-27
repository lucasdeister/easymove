import express, { Request, Response } from "express";
import rideController from "../controllers/rideController.js";

const routes = express.Router();

// Interface para validar os dados do corpo da requisição
interface EstimateRequestBody {
  customer_id: number;
  origin: string;
  destination: string;
}

interface ConfirmRequestBody {
  customer_id: number;
  origin: string;
  destination: string;
  distance: number;
  duration: string;
  driver: {
    id: number;
    name: string;
  };
  value: number;
}

interface GetRideResponse {
  id: number;
  date: string;
  origin: string;
  destination: string;
  distance: number;
  duration: string;
  driver: {
    id: number;
    name: string;
  };
  value: number;
}

// Rota Estimar ride
routes.post("/estimate", async (req: Request, res: Response) => {
  const { customer_id, origin, destination } = req.body as EstimateRequestBody;

  if (!customer_id || !origin || !destination || origin === destination) {
    return res.status(400).json({
      error_code: "INVALID_DATA",
      error_description: "Os dados fornecidos no corpo da requisição são inválidos",
    });
  }

  const response = await rideController.calcularEstimativa(origin, destination);
  console.log(response);
  return res.status(200).json(response);
});

// Confirmar ride
routes.post("/confirm", async (req: Request, res: Response) => {
  const { customer_id, origin, destination, distance, duration, driver, value } =
    req.body as ConfirmRequestBody;

  console.log(req.body);

  const validationResult = await rideController.confirmRouteValidations(
    customer_id,
    origin,
    destination,
    distance,
    driver
  );

  if (validationResult.statusCode === 200) {
    await rideController.salvarRide(
      customer_id,
      origin,
      destination,
      distance,
      duration,
      driver,
      value
    );
  }

  return res.status(validationResult.statusCode).json(validationResult.body);
});

// Classe de resposta para get rides
class RideResponse implements GetRideResponse {
  id: number;
  date: string;
  origin: string;
  destination: string;
  distance: number;
  duration: string;
  driver: {
    id: number;
    name: string;
  };
  value: number;

  constructor(
    id: number,
    date: string,
    origin: string,
    destination: string,
    distance: number,
    duration: string,
    driver: { id: number; name: string },
    value: number
  ) {
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
routes.get("/:customer_id", async (req: Request, res: Response) => {

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

  const ridesResult = await rideController.getRides(

    customer_id, driver_id
  );

  if (!ridesResult) {
    return res.status(400).json({
      error_code: "INVALID_DRIVER",
      error_description: "Motorista inválido",
    });
  }

  const rides: RideResponse[] = ridesResult.map(
    (ride: any) =>
      new RideResponse(
        ride.id,
        ride.date,
        ride.origin,
        ride.destination,
        ride.distance,
        ride.duration,
        { id: ride.driverId, name: ride.driverName },
        ride.value
      )
  );

  console.log(rides);

  return res.status(200).json({
    customer_id,
    rides,
  });
});

export default routes;
