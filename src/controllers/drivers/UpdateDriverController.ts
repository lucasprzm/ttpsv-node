import { prismaClient } from "../../../prisma/prismaClient";
import { NextFunction, Request, Response } from "express";

export class UpdateDriverController {
  async handle(request: Request, response: Response, next: NextFunction) {
    const { id } = request.params;
    const { name } = request.body;

    const driver = await prismaClient.driver
      .update({
        where: {
          id: +id,
        },
        data: {
          name,
        },
      })
      .catch((err) => next(err));

    console.log(`Driver's name updated succesfully!`);
    return response.status(200).json({ message: "Motorista atualizado com sucesso!", driver });
  }
}
