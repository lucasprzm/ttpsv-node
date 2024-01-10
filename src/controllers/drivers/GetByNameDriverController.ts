import { prismaClient } from "../../../prisma/prismaClient";
import { Request, Response } from "express";

export class GetByNameDriverController {
  async handle(request: Request, response: Response) {
    const { name } = request.body;

    const drivers = await prismaClient.driver.findMany({
      where: {
        name: {
          contains: name,
        },
      },
    });

    console.log(`Drivers obtained succesfully!`);
    return response.status(200).json(drivers);
  }
}
