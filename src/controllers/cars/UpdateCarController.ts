import { prismaClient } from "../../../prisma/prismaClient";
import { Request, Response } from "express";

export class UpdateCarController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const { plate, brand, color } = request.body;

    const car = await prismaClient.car.update({
      where: {
        id: +id,
      },
      data: {
        brand,
        plate,
        color,
      },
    });

    console.log(`Car brand ${brand}, plate ${plate}, color ${color} updated succesfully!`);
    return response.status(200).json({ message: "Automóvel atualizado com sucesso!" });
  }
}
