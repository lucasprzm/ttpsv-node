import { prismaClient } from "../../../prisma/prismaClient";
import { Request, Response } from "express";

export class FinishedUsingCarDriverController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const carDriver = await prismaClient.carDriver.update({
      where: {
        id: +id,
      },
      data: {
        finishedUsing: new Date(),
      },
    });

    console.log(`Driver's finished using date saved succesfully!`);
    return response.status(200).json({ message: "Uso do carro finalizado com sucesso!" });
  }
}
