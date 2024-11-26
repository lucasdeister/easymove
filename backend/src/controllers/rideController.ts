import axios from "../../node_modules/axios/index.js";
import dbController from "./dbController.js";

const API_KEY = "AIzaSyBhZVwamaETSI7LaUQCbvpiQcsCs8fAFV0";
const BASE_URL = "https://routes.googleapis.com/directions/v2:computeRoutes";

// Interfaces para tipos
interface Driver {
  id: number;
  name: string;
  descricao?: string;
  carro?: string;
  rating?: number;
  comment?: string;
  taxaPorKm?: number;
  kmMinimo?: number;
}

interface RouteResponse {
  distanceMeters: number;
  duration: string;
  startLocation: { latLng: { latitude: number; longitude: number } };
  endLocation: { latLng: { latitude: number; longitude: number } };
}

interface TravelData {
  origin: { latitude: number; longitude: number };
  destination: { latitude: number; longitude: number };
  distancia: number;
  tempo: string;
  routeResponse: RouteResponse;
}

class Option {
  id: number;
  name: string;
  description: string;
  vehicle: string;
  review: { rating: number; comment: string | null };
  value: number;

  constructor(
    id: number,
    name: string,
    description: string,
    vehicle: string,
    rating: number,
    comment: string | null,
    value: number
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.vehicle = vehicle;
    this.review = { rating, comment };
    this.value = value;
  }
}

// Funções
async function salvarRide(
  customer_id: number,
  origin: string,
  destination: string,
  distance: number,
  duration: string,
  driver: Driver,
  value: number
) {
  return await dbController.saveRide(
    customer_id, origin, destination, distance, duration, {id: driver.id, nome: driver.name}, value
  );
}

async function getRides(customer_id: number, driver_id?: number) {
  if (driver_id) {
    return await dbController.getRidesbyCustomerIdDriverId(customer_id, driver_id);
  } else {
    return await dbController.getRidesbyCustomerId(customer_id);
  }
}

async function calcularEstimativa(origin: string, destination: string) {
  const data = await getTravel(origin, destination);
  const km = data.distancia / 1000;

  const options: Option[] = [];
  const motoristas = await dbController.getAllDriversAvailableForTravel(km);

  motoristas.forEach(driver => {
    const valorTotal = (driver.taxaPorKm) * km;

    options.push(
      new Option(
        driver.id,
        driver.nome,
        driver.descricao,
        driver.carro,
        driver.rating,
        driver.comment,
        valorTotal
      )
    );
  });

  return {
    origin: data.origin,
    destination: data.destination,
    distance: data.distancia,
    duration: data.tempo,
    options,
    routeResponse: data.routeResponse,
  };
}

async function getGoogleRoute(origin: string, destination: string): Promise<RouteResponse | undefined> {
  try {
    const response = await axios.post(
      BASE_URL,
      {
        origin: { address: origin },
        destination: { address: destination },
        travelMode: "DRIVE",
        polylineEncoding: "GEO_JSON_LINESTRING",
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": API_KEY,
          "X-Goog-FieldMask": "routes.legs.duration,routes.legs.distanceMeters,routes.legs.startLocation,routes.legs.endLocation",
        },
      }
    );

    return response.data.routes[0].legs[0];
  } catch (error: any) {
    console.error("Google route request error:", error.response?.data || error.message);
  }
}

async function getTravel(origin: string, destination: string): Promise<TravelData> {
  const route = await getGoogleRoute(origin, destination);
  if (!route) throw new Error("Route not found");

  const coordOrigin = {
    latitude: route.startLocation.latLng.latitude,
    longitude: route.startLocation.latLng.longitude,
  };
  const coordDestination = {
    latitude: route.endLocation.latLng.latitude,
    longitude: route.endLocation.latLng.longitude,
  };

  return {
    origin: coordOrigin,
    destination: coordDestination,
    distancia: route.distanceMeters,
    tempo: route.duration,
    routeResponse: route,
  };
}

async function getMotorista(id_driver: number, nome_driver: string) {
  return await dbController.getAllDriversByIdName(id_driver, nome_driver);
}

function createResponse(statusCode: number, data: any) {
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

async function confirmRouteValidations(
  customer_id: number,
  origin: string,
  destination: string,
  distance: number,
  driver: Driver
) {
  if (!origin || !destination || !customer_id || origin === destination) {
    return invalidDataResponse;
  }

  const validDrivers = await getMotorista(driver.id, driver.name);
  if (!validDrivers) {
    return driverNotFoundResponse;
  }

  if (distance < (validDrivers.kmMinimo || 0)) {
    return invalidDistanceResponse;
  }

  return successResponse;
}

export default{
  calcularEstimativa,
  salvarRide,
  confirmRouteValidations,
  getRides,
};
