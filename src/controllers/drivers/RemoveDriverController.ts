import { prismaClient } from "../../../prisma/prismaClient";
import { Request, Response } from "express";

export class RemoveDriverController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const driver = await prismaClient.driver.update({
      where: {
        id: +id,
      },
      data: {
        removedAt: new Date(),
      },
    });

    console.log(`Driver removed succesfully!`);
    return response.status(200).json({ message: "Motorista removido com sucesso!" });
  }
}
