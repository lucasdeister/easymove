import { PrismaClient, motorista, historico_viagem } from "../../node_modules/.prisma/client/default.js";

const prisma = new PrismaClient();

// Funções
async function getAllDriversAvailableForTravel(distance: number): Promise<motorista[]> {
  try {
    const motoristas = await prisma.motorista.findMany({
      where: {
        kmMinimo: {
          lte: distance,
        },
      },
    });

    return motoristas;
  } catch (error) {
    console.error("Error ao buscar motoristas disponíveis para viagem:", error);
    return [];
  }
}

async function getAllDriversById(id: number): Promise<motorista | null> {
  try {
    const motorista = await prisma.motorista.findUnique({
      where: { id },
    });

    return motorista;
  } catch (error) {
    console.error("Erro ao buscar motorista por ID:", error);
    return null;
  }
}

async function getAllDriversByIdName(id_driver: number, nome_driver: string): Promise<motorista | null> {
  try {
    const motorista = await prisma.motorista.findFirst({
      where: { id: id_driver, nome: nome_driver },
    });

    return motorista;
  } catch (error) {
    console.error("Erro ao buscar motorista por ID e nome:", error);
    return null;
  }
}

async function getRidesbyCustomerId(id: number): Promise<historico_viagem[]> {
  try {
    const rides = await prisma.historico_viagem.findMany({
      where: { customerId: id },
    });

    return rides;
  } catch (error) {
    console.error("Erro ao buscar viagens por ID do cliente:", error);
    return [];
  }
}

async function getRidesbyCustomerIdDriverId(customerid: number, driverid: number): Promise<historico_viagem[]> {
  try {
    const rides = await prisma.historico_viagem.findMany({
      where: { customerId: customerid, driverId: driverid },
    });

    return rides;
  } catch (error) {
    console.error("Erro ao buscar viagens por cliente e motorista:", error);
    return [];
  }
}

async function saveRide(customer_id: number, origin: string,
   destination: string, distance: number, duration: string, driver: {id:number, nome: string}, value: number): Promise<historico_viagem | null> {
  try {
    const rideSaved = await prisma.historico_viagem.create({
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
  } catch (error) {
    console.error("Erro ao salvar viagem:", error);
    return null;
  }
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
