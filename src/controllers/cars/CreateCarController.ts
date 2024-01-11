import { prismaClient } from "../../../prisma/prismaClient";
import { NextFunction, Request, Response } from "express";

export class CreateCarController {
  async handle(request: Request, response: Response, next: NextFunction) {
    const { plate, brand, color } = request.body;

    const car = await prismaClient.car
      .create({
        data: {
          brand,
          plate,
          color,
        },
      })
      .catch((err) => next(err));

    console.log(`Car brand ${brand}, plate ${plate}, color ${color} created succesfully!`);
    return response.status(201).json({ message: "Automóvel criado com sucesso!", car });
  }
}
