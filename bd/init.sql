-- Create the database if it doesn't exist
 
CREATE DATABASE easymovedb WITH OWNER = postgres ENCODING = 'UTF8' LC_COLLATE = 'en_US.utf8' LC_CTYPE = 'en_US.utf8' TABLESPACE = pg_default CONNECTION
LIMIT = -1 IS_TEMPLATE = False;

GRANT ALL ON DATABASE easymovedb TO postgres;

GRANT
TEMPORARY,
      CONNECT ON DATABASE easymovedb TO PUBLIC;

\c easymovedb;

-- CreateTable

CREATE TABLE IF NOT EXISTS public.motoristas ("id" SERIAL PRIMARY KEY,
                                                                  "nome" VARCHAR(30) NOT NULL,
                                                                                     "descricao" VARCHAR(250) NOT NULL,
                                                                                                              "carro" VARCHAR(20) NOT NULL,
                                                                                                                                  "rating" INTEGER NOT NULL CHECK (rating >= 1
                                                                                                                                                                   AND rating <= 5), -- Rating scale from 1 to 5
 "comment" VARCHAR(250),
           "taxa_por_km" NUMERIC(10, 2) NOT NULL, -- Fee per km in BRL
 "km_minimo" NUMERIC(10, 2) NOT NULL, -- Minimum distance in km
 CONSTRAINT fk_driver_id
                                              FOREIGN KEY (id) REFERENCES rides(driver_id) -- Foreign key to link with rides table
);


ALTER TABLE IF EXISTS public.motoristas OWNER to postgres;

-- CreateTable

CREATE TABLE IF NOT EXISTS public.viagens ("id" SERIAL PRIMARY KEY,
                                                               "date" DATE NOT NULL,
                                                                           "customer_id" INTEGER NOT NULL,
                                                                                                 "origin" VARCHAR(100) NOT NULL,
                                                                                                                       "destination" VARCHAR(100) NOT NULL,
                                                                                                                                                  "distance" BIGINT NOT NULL, -- Distance in meters
 "duration" BIGINT NOT NULL, -- Duration in seconds
 "driver_id" INTEGER NOT NULL,
                     "driver_name" VARCHAR(50) NOT NULL,
                                               "value" NUMERIC(10, 2) NOT NULL,
                                           FOREIGN KEY (driver_id) REFERENCES motoristas(id));


ALTER TABLE IF EXISTS public.viagens OWNER to postgres;


INSERT INTO public.motorista(id, nome, descricao, carro, rating, comment, "taxaPorKm", "kmMinimo")
VALUES ('Homer Simpson',
        'Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas e boas risadas (e talvez alguns desvios).',
        'Plymouth Valiant 1973 rosa e enferrujado',
        2,
        'Motorista simpático, mas errou o caminho 3 vezes. O carro cheira a donuts.',
        2.5,
        1);


INSERT INTO public.motorista(id, nome, descricao, carro, rating, comment, "taxaPorKm", "kmMinimo")
VALUES ('Dominic Toretto',
        'Ei, aqui é o Dom. Pode entrar, vou te levar com segurança e rapidez ao seu destino. Só não mexa no rádio, a playlist é sagrada.',
        'Dodge Charger R/T 1970 modificado',
        4,
        'Que viagem incrível! O carro é um show à parte e o motorista, apesar de ter uma cara de poucos amigos, foi super gente boa. Recomendo!',
        5.0,
        5);


INSERT INTO public.motorista(id, nome, descricao, carro, rating, comment, "taxaPorKm", "kmMinimo")
VALUES ('James Bond',
        'Boa noite, sou James Bond. À seu dispor para um passeio suave e discreto. Aperte o cinto e aproveite a viagem.',
        'Aston Martin DB5 clássico',
        5,
        'Serviço impecável! O motorista é a própria definição de classe e o carro é simplesmente magnífico. Uma experiência digna de um agente secreto.',
        10.0,
        10);