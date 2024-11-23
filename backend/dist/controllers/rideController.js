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
import polyline from "@mapbox/polyline";
const API_KEY = "SUA_API_KEY";
const BASE_URL = "https://routes.googleapis.com/directions/v2:computeRoutes";
// Motoristas fictícios
const motoristas = [
    {
        id: 1,
        nome: "Homer Simpson",
        descricao: "Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas e boas risadas (e talvez alguns desvios).",
        carro: "Plymouth Valiant 1973 rosa e enferrujado",
        rating: "2/5",
        comment: "Motorista simpático, mas errou o caminho 3 vezes. O carro cheira a donuts.",
        taxaPorKm: 2.5,
        kmMinimo: 1,
    },
    {
        id: 2,
        nome: "Dominic Toretto",
        descricao: "Ei, aqui é o Dom. Pode entrar, vou te levar com segurança e rapidez ao seu destino. Só não mexa no rádio, a playlist é sagrada.",
        carro: "Dodge Charger R/T 1970 modificado",
        rating: "4/5",
        comment: "Que viagem incrível! O carro é um show à parte e o motorista, apesar de ter uma cara de poucos amigos, foi super gente boa. Recomendo!",
        taxaPorKm: 5.0,
        kmMinimo: 5,
    },
    {
        id: 3,
        nome: "James Bond",
        descricao: "Boa noite, sou James Bond. À seu dispor para um passeio suave e discreto. Aperte o cinto e aproveite a viagem.",
        carro: "Aston Martin DB5 clássico",
        rating: "5/5",
        comment: "Serviço impecável! O motorista é a própria definição de classe e o carro é simplesmente magnífico. Uma experiência digna de um agente secreto.",
        taxaPorKm: 10.0,
        kmMinimo: 10,
    },
];
// Classe de Ride
class RideClass {
    constructor(customer_id, origin, destination, distance, duration, driver, value) {
        this.id = 1;
        this.date = "2024/11";
        this.customer_id = customer_id;
        this.origin = origin;
        this.destination = destination;
        this.distance = distance;
        this.duration = duration;
        this.driver = driver;
        this.value = value;
    }
}
const rides = [];
function salvarRide(customer_id, origin, destination, distance, duration, driver, value) {
    rides.push(new RideClass(customer_id, origin, destination, distance, duration, driver, value));
    //salvar no banco
}
function getRides(customer_id, driver_id) {
    if (driver_id) {
        return rides.filter((ride) => ride.customer_id === customer_id && ride.driver.id === driver_id);
    }
    else {
        return rides.filter((ride) => ride.customer_id === customer_id);
    }
}
function calcularEstimativa(origin, destination) {
    //const data = getTravel(origin, destination); // tem que ajustar o request do google
    //metodo para test abaixo
    const coordOrigin = { latitude: "A285129199181A", longitude: "A119818916A" };
    const coordDestination = { latitude: "B285129199181B", longitude: "B119818916B" };
    const data = {
        origin: coordOrigin,
        destination: coordDestination,
        distancia: 12300,
        tempo: 20000,
        routeResponse: "Original response form google"
    };
    //metodo para test acima
    const horas = data.tempo / 360;
    const km = data.distancia / 1000;
    const options = [];
    motoristas.forEach((motorista) => {
        let valorTotal = motorista.taxaPorKm * km;
        if (motorista.kmMinimo <= km) {
            options.push({
                id: motorista.id,
                name: motorista.nome,
                description: motorista.descricao,
                vehicle: motorista.carro,
                review: { rating: motorista.rating, comment: motorista.comment },
                value: valorTotal,
            });
        }
    });
    return {
        origin: data.origin,
        destination: data.destination,
        distance: km,
        duration: horas,
        options,
        routeResponse: data.routeResponse,
    };
}
function getGoogleRoute(origin, destination) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const response = yield axios.post(BASE_URL, {
                origin: { location: { address: origin } },
                destination: { location: { address: destination } },
                travelMode: "DRIVE", // Modos disponíveis: DRIVE, BICYCLE, WALK
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "X-Goog-Api-Key": API_KEY,
                    "X-Goog-FieldMask": "routes.duration,routes.distanceMeters,routes.polyline",
                },
            });
            return response.data.routes[0];
        }
        catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("Google route request error:", ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message);
                return null;
            }
            else {
                console.error("Unexpected error:", error);
            }
        }
        return null;
    });
}
function getTravel(origin, destination) {
    return __awaiter(this, void 0, void 0, function* () {
        // Exibindo os resultados
        const route = yield getGoogleRoute(origin, destination);
        if (!route) {
            throw new Error("Erro ao obter a rota do Google");
        }
        console.log("Duração (em segundos):", route.duration);
        console.log("Distância (em metros):", route.distanceMeters);
        const tempo = route.duration;
        const distancia = route.distanceMeters;
        // get lat & long
        const location = [{ latitude: 0, longitude: 0 }];
        const decodedCoordinates = polyline.decode(route.polyline);
        decodedCoordinates.forEach((coord) => {
            location.push({ latitude: coord[0], longitude: coord[1] });
            console.log(`Latitude: ${coord[0]}, Longitude: ${coord[1]}`);
        });
        const coordOrigin = { latitude: location[0].latitude, longitude: location[0].longitude };
        const coordDestination = { latitude: location[1].latitude, longitude: location[1].longitude };
        return { origin: coordOrigin, destination: coordDestination, distancia, tempo, routeResponse: route };
    });
}
function getMotorista(id_driver, nome_driver) {
    return motoristas.filter((motorista) => motorista.id === id_driver && motorista.nome === nome_driver);
}
// Respostas 
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
function confirmValidations(customer_id, origin, destination, distance, driver) {
    // 1. Verificar se os endereços de origem e destino não estão em branco
    if (!origin || !destination) {
        return invalidDataResponse;
    }
    // 2. Verificar se o ID do usuário não está em branco
    if (!customer_id) {
        return invalidDataResponse;
    }
    // 3. Verificar se origem e destino são diferentes
    if (origin === destination) {
        return invalidDataResponse;
    }
    // 4. Validar se a opção de motorista é válida
    const validDrivers = getMotorista(driver.id, driver.name);
    if (!validDrivers) {
        return driverNotFoundResponse;
    }
    // 5. Validar se a quilometragem é válida para o motorista
    let driverKm = validDrivers[0].kmMinimo;
    if (distance < driverKm) {
        return invalidDistanceResponse;
    }
    return successResponse;
}
export { calcularEstimativa, salvarRide, confirmValidations, getRides };
