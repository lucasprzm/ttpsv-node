import { prismaClient } from "../../../prisma/prismaClient";
import { NextFunction, Request, Response } from "express";

export class UpdateCarController {
  async handle(request: Request, response: Response, next: NextFunction) {
    const { id } = request.params;
    const { plate, brand, color } = request.body;

    const car = await prismaClient.car
      .update({
        where: {
          id: +id,
        },
        data: {
          brand,
          plate,
          color,
        },
      })
      .catch((err) => next(err));

    console.log(`Car brand ${brand}, plate ${plate}, color ${color} updated succesfully!`);
    return response.status(200).json({ message: "Automóvel atualizado com sucesso!", car });
  }
}
