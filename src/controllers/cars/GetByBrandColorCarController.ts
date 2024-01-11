import { prismaClient } from "../../../prisma/prismaClient";
import { NextFunction, Request, Response } from "express";

export class GetByBrandColorCarController {
  async handle(request: Request, response: Response, next: NextFunction) {
    const { brand, color } = request.body;

    const cars = await prismaClient.car
      .findMany({
        where: {
          AND: {
            brand: {
              contains: brand,
            },
            color: {
              contains: color,
            },
          },
        },
      })
      .catch((err) => next(err));

    console.log(`Cars obtained succesfully!`);
    return response.status(200).json(cars);
  }
}
