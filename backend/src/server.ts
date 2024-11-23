import express, { Application } from 'express';
import rideRoutes from './routes/rideRoutes.js';
import cors from "cors"

const app: Application = express();

app.use(cors());

// Middleware para analisar JSON
app.use(express.json());

// Rotas
app.use("/ride", rideRoutes);

const PORT: number = 8080;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

