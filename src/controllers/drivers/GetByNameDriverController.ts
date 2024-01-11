import { prismaClient } from "../../../prisma/prismaClient";
import { NextFunction, Request, Response } from "express";

export class GetByNameDriverController {
  async handle(request: Request, response: Response, next: NextFunction) {
    const { name } = request.body;

    const drivers = await prismaClient.driver
      .findMany({
        where: {
          name: {
            contains: name,
          },
        },
      })
      .catch((err) => next(err));
    // #TODO filtrar para motoristas não removidos
    console.log(`Drivers obtained succesfully!`);
    return response.status(200).json(drivers);
  }
}
