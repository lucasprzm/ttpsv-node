import { prismaClient } from "../../../prisma/prismaClient";
import { NextFunction, Request, Response } from "express";

export class GetNameCarDriverDriverController {
  async handle(request: Request, response: Response, next: NextFunction) {
    const drivers = await prismaClient.driver
      .findMany({
        select: {
          name: true,
          carDrivers: true,
        },
      })
      .catch((err) => next(err));

    console.log(`Drivers obtained succesfully!`);
    return response.status(200).json(drivers);
  }
}
