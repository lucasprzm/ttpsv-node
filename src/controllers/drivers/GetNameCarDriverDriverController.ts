import { prismaClient } from "../../../prisma/prismaClient";
import { Request, Response } from "express";

export class GetNameCarDriverDriverController {
  async handle(request: Request, response: Response) {
    const drivers = await prismaClient.driver.findMany({
      select: {
        name: true,
        carDrivers: true,
      },
    });

    console.log(`Drivers obtained succesfully!`);
    return response.status(200).json(drivers);
  }
}
