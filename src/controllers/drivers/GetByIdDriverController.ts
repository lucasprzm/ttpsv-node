import { prismaClient } from "../../../prisma/prismaClient";
import { NextFunction, Request, Response } from "express";

export class GetByIdDriverController {
  async handle(request: Request, response: Response, next: NextFunction) {
    const { id } = request.params;

    const driver = await prismaClient.driver
      .findFirst({
        where: {
          AND: {
            id: +id,
            removedAt: {
              equals: null,
            },
          },
        },
      })
      .catch((err) => next(err));
    // #TODO Ajustar se driver for null
    console.log(`Driver obtained succesfully!`);
    return response.status(200).json(driver);
  }
}
