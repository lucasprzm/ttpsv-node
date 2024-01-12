import express, { Request, Response, NextFunction } from "express";
import { carsDriversRouter, carsRouter, driversRouter } from "./routes";

// Repository Pattern
const app = express();

app.use(express.json());
app.use("/cars", carsRouter);
app.use("/drivers", driversRouter);
app.use("/cars-drivers", carsDriversRouter);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof Error) {
    return response.status(400).json({ error: "Ocorreu um erro, tente novamente!" });
  }
  return response.status(500).json({
    status: "error",
    message: "Ocorreu um erro, tente novamente!",
  });
});

const server = app.listen(3000, () =>
  console.log(`
🚀 Server ready at: http://localhost:3000`)
);

// #TODO Retorno de datas com data em UTC, ajustar tempo para BR
