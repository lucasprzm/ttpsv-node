import { prismaClient } from "../../../prisma/prismaClient";
import { Request, Response } from "express";

export class CreateCarDriverController {
  async handle(request: Request, response: Response) {
    const { reason, carId, driverId } = request.body;

    // #TODO fazer regras para verificar carro sendo usado e motorista já dirigindo outro carro
    const carDriver = await prismaClient.carDriver.create({
      data: {
        reason,
        carId,
        driverId,
      },
    });

    console.log(`Driver linked to car succesfully!`);
    return response.status(201).json({ message: "Motorista vinculado ao carro com sucesso!" });
  }
}
