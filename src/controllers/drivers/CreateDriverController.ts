import { prismaClient } from "../../../prisma/prismaClient";
import { Request, Response } from "express";

export class CreateDriverController {
  async handle(request: Request, response: Response) {
    const { name } = request.body;

    const driver = await prismaClient.driver.create({
      data: {
        name,
      },
    });

    console.log(`Driver created succesfully!`);
    return response.status(201).json({ message: "Motorista criado com sucesso!", driver });
  }
}
