import { prismaClient } from "../../../prisma/prismaClient";
import { Request, Response } from "express";

export class UpdateDriverController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const { name } = request.body;

    const driver = await prismaClient.driver.update({
      where: {
        id: +id,
      },
      data: {
        name,
      },
    });

    console.log(`Driver's name updated succesfully!`);
    return response.status(200).json({ message: "Motorista atualizado com sucesso!", driver });
  }
}
