import express, { Application } from 'express';

const app: Application = express();

// Middleware para analisar JSON
app.use(express.json());


export default app;