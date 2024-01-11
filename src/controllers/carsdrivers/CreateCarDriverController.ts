import { prismaClient } from "../../../prisma/prismaClient";
import { Request, Response } from "express";

export class CreateCarDriverController {
  async handle(request: Request, response: Response) {
    const { reason, carId, driverId } = request.body;

    const carBeingUsed = await checkCarBeingUsed(carId);

    if (carBeingUsed) {
      return response.status(400).json({
        message:
          "Automóvel já está sendo usado, finalize o vínculo anterior para completar a nova vinculação.",
      });
    }

    const driverBeingUsed = await checkDriverBeingUsed(driverId);

    if (driverBeingUsed) {
      return response.status(400).json({
        message:
          "Motorista utilizando outro veículo, finalize o vínculo anterior para completar a nova vinculação.",
      });
    }

    const carDriver = await prismaClient.carDriver.create({
      data: {
        reason,
        carId,
        driverId,
      },
    });

    console.log(`Driver linked to car succesfully!`);
    return response.status(201).json({ message: "Motorista vinculado ao carro com sucesso!" });

    async function checkCarBeingUsed(carId: number): Promise<boolean> {
      const carBeingUsed =
        (await prismaClient.carDriver.count({
          where: {
            AND: {
              carId: {
                equals: carId,
              },
              finishedUsing: {
                equals: null,
              },
              removedAt: {
                equals: null,
              },
            },
          },
        })) > 0;

      return carBeingUsed;
    }

    async function checkDriverBeingUsed(driverId: number): Promise<boolean> {
      const driverBeingUsed =
        (await prismaClient.carDriver.count({
          where: {
            AND: {
              driverId: {
                equals: driverId,
              },
              finishedUsing: {
                equals: null,
              },
              removedAt: {
                equals: null,
              },
            },
          },
        })) > 0;

      return driverBeingUsed;
    }
  }
}
