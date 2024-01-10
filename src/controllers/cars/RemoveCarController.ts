import { prismaClient } from "../../../prisma/prismaClient";
import { Request, Response } from "express";

export class RemoveCarController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const car = await prismaClient.car.update({
      where: {
        id: +id,
      },
      data: {
        removedAt: new Date(),
      },
    });

    console.log(`Car of id ${id} removed succesfully!`);
    return response.status(200).json({ message: "Automóvel removido com sucesso!" });
  }
}
