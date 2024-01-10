import { prismaClient } from "../../../prisma/prismaClient";
import { Request, Response } from "express";

export class GetByIdDriverController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const driver = await prismaClient.driver.findFirst({
      where: {
        AND: {
          id: +id,
          removedAt: {
            equals: null,
          },
        },
      },
    });

    console.log(`Driver obtained succesfully!`);
    return response.status(200).json(driver);
  }
}
