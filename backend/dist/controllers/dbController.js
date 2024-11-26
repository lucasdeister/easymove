var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { PrismaClient } from "../../node_modules/.prisma/client/default.js";
const prisma = new PrismaClient();
// Funções
function getAllDriversAvailableForTravel(distance) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const motoristas = yield prisma.motorista.findMany({
                where: {
                    kmMinimo: {
                        lte: distance,
                    },
                },
            });
            return motoristas;
        }
        catch (error) {
            console.error("Error ao buscar motoristas disponíveis para viagem:", error);
            return [];
        }
    });
}
function getAllDriversById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const motorista = yield prisma.motorista.findUnique({
                where: { id },
            });
            return motorista;
        }
        catch (error) {
            console.error("Erro ao buscar motorista por ID:", error);
            return null;
        }
    });
}
function getAllDriversByIdName(id_driver, nome_driver) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const motorista = yield prisma.motorista.findFirst({
                where: { id: id_driver, nome: nome_driver },
            });
            return motorista;
        }
        catch (error) {
            console.error("Erro ao buscar motorista por ID e nome:", error);
            return null;
        }
    });
}
function getRidesbyCustomerId(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const rides = yield prisma.historico_viagem.findMany({
                where: { customerId: id },
            });
            return rides;
        }
        catch (error) {
            console.error("Erro ao buscar viagens por ID do cliente:", error);
            return [];
        }
    });
}
function getRidesbyCustomerIdDriverId(customerid, driverid) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const rides = yield prisma.historico_viagem.findMany({
                where: { customerId: customerid, driverId: driverid },
            });
            return rides;
        }
        catch (error) {
            console.error("Erro ao buscar viagens por cliente e motorista:", error);
            return [];
        }
    });
}
function saveRide(customer_id, origin, destination, distance, duration, driver, value) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const rideSaved = yield prisma.historico_viagem.create({
                data: {
                    customerId: customer_id,
                    origin: origin,
                    destination: destination,
                    distance: distance,
                    duration: duration,
                    driverId: driver.id,
                    driverName: driver.nome,
                    value: value
                }
            });
            return rideSaved;
        }
        catch (error) {
            console.error("Erro ao salvar viagem:", error);
            return null;
        }
    });
}
// Exportação
export default {
    getAllDriversAvailableForTravel,
    getAllDriversById,
    getAllDriversByIdName,
    getRidesbyCustomerId,
    getRidesbyCustomerIdDriverId,
    saveRide,
};
