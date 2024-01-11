import { prismaClient } from "../../../prisma/prismaClient";
import { NextFunction, Request, Response } from "express";

export class CreateDriverController {
  async handle(request: Request, response: Response, next: NextFunction) {
    const { name } = request.body;

    const driver = await prismaClient.driver
      .create({
        data: {
          name,
        },
      })
      .catch((err) => next(err));

    console.log(`Driver created succesfully!`);
    return response.status(201).json({ message: "Motorista criado com sucesso!", driver });
  }
}
