import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { carsRouter, driversRouter } from "./routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/cars", carsRouter);
app.use("/drivers", driversRouter);

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

// #TODO catch para as requisições, criação de carro com placa igual
// #TODO Retorno de datas com data futura errada, ajustar tempo para BR
// #TODO Testar cenários adversos
// #TODO Tirar dados específicos do log para não encher muito, colocar status ou algo mais em caso de erro para ajudar
// #TODO Verificar melhores práticas para rotas em métodos HTTP
