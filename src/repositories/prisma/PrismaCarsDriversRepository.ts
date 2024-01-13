import { CarDriver } from "@prisma/client";
import { prismaClient } from "../../../prisma/prismaClient";
import { CarsDriversRepository, ICreateCarDriverDTO } from "../CarsDriversRepository";

export class PrismaCarsDriversRepository implements CarsDriversRepository {
  async create(data: ICreateCarDriverDTO): Promise<CarDriver> {
    const carDriver = await prismaClient.carDriver.create({
      data,
    });
    return carDriver;
  }
  async finishedUsing(id: number): Promise<void> {
    await prismaClient.carDriver.update({
      where: {
        id,
      },
      data: {
        finishedUsing: new Date(),
      },
    });
  }
  async getByIdAndFinishedUsingNull(id: number): Promise<CarDriver | null> {
    const carDriver = await prismaClient.carDriver.findFirst({
      where: {
        id: {
          equals: id,
        },
        finishedUsing: {
          equals: null,
        },
        removedAt: {
          equals: null,
        },
      },
    });
    return carDriver;
  }

  async getByIdAndFinishedUsingNotNull(id: number): Promise<CarDriver | null> {
    const carDriver = await prismaClient.carDriver.findFirst({
      where: {
        id: {
          equals: id,
        },
        finishedUsing: {
          not: null,
        },
        removedAt: {
          equals: null,
        },
      },
    });
    return carDriver;
  }

  async getByCarIdDriverIdAndFinishedUsingNull(
    carId: number,
    driverId: number
  ): Promise<CarDriver | null> {
    const carDriver = await prismaClient.carDriver.findFirst({
      where: {
        AND: {
          carId: {
            equals: carId,
          },
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
    });
    return carDriver;
  }
  async getByCarIdAndFinishedUsingNull(carId: number): Promise<CarDriver | null> {
    const carDriver = await prismaClient.carDriver.findFirst({
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
    });
    return carDriver;
  }
  async getByDriverIdAndFinishedUsingNull(driverId: number): Promise<CarDriver | null> {
    const carDriver = await prismaClient.carDriver.findFirst({
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
    });
    return carDriver;
  }
}
