-- CreateTable
CREATE TABLE "motorista" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "carro" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT,
    "taxaPorKm" DOUBLE PRECISION NOT NULL,
    "kmMinimo" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "motorista_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "historico_viagem" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "customerId" INTEGER NOT NULL,
    "origin" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "distance" INTEGER NOT NULL,
    "duration" TEXT NOT NULL,
    "driverId" INTEGER NOT NULL,
    "driverName" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "historico_viagem_pkey" PRIMARY KEY ("id")
);
