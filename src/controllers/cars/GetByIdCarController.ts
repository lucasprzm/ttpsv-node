import { prismaClient } from "../../../prisma/prismaClient";
import { Request, Response } from "express";

export class GetByIdCarController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const car = await prismaClient.car.findFirst({
      where: {
        AND: {
          id: +id,
          removedAt: {
            equals: null,
          },
        },
      },
    });

    console.log(
      `Car brand ${car?.brand}, plate ${car?.plate}, color ${car?.color} obtained succesfully!`
    );
    return response.status(200).json(car);
  }
}
