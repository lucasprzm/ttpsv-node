import { prismaClient } from "../../../prisma/prismaClient";
import { CarsDriversRepository } from "../../repositories/CarsDriversRepository";

interface ICreateCarDriverRequest {
  carId: number;
  driverId: number;
  reason: string;
}

export class CreateCarDriver {
  constructor(private carsDriversRepository: CarsDriversRepository) {}

  async execute(data: ICreateCarDriverRequest) {
    const carDriverAlreadyExists = await prismaClient.carDriver.findFirst({
      where: {
        AND: {
          carId: {
            equals: data.carId,
          },
          driverId: {
            equals: data.driverId,
          },
          finishedUsing: {
            equals: null,
          },
          removedAt: {
            equals: null,
          },
        },
      },
    });

    if (carDriverAlreadyExists) {
      throw new Error("Motorista já está alocado neste carro.");
    }

    const carBeingUsed =
      (await prismaClient.carDriver.count({
        where: {
          AND: {
            carId: {
              equals: data.carId,
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

    if (carBeingUsed) {
      throw new Error("Automóvel já está sendo utilizado.");
    }

    const driverBeingUsed =
      (await prismaClient.carDriver.count({
        where: {
          AND: {
            driverId: {
              equals: data.driverId,
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

    if (driverBeingUsed) {
      throw new Error("Motorista já está alocado em outro carro.");
    }

    const carDriver = await this.carsDriversRepository.create(data);

    return carDriver;
  }
}
