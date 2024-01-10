import { prismaClient } from "../../../prisma/prismaClient";
import { Request, Response } from "express";

export class CreateCarController {
  async handle(request: Request, response: Response) {
    const { plate, brand, color } = request.body;

    const car = await prismaClient.car.create({
      data: {
        brand,
        plate,
        color,
      },
    });

    console.log(`Car brand ${brand}, plate ${plate}, color ${color} created succesfully!`);
    return response.status(201).json({ message: "Automóvel criado com sucesso!" });
  }
}
