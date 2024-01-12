import { Driver } from "@prisma/client";
import { prismaClient } from "../../../prisma/prismaClient";
import { ICreateDriverDTO, DriversRepository } from "../DriversRepository";

export class PrismaDriversRepository implements DriversRepository {
  async create(data: ICreateDriverDTO): Promise<Driver> {
    const driver = await prismaClient.driver.create({
      data,
    });
    return driver;
  }
  async getById(id: number): Promise<Driver | null> {
    const driver = await prismaClient.driver.findFirst({
      where: {
        AND: {
          id: {
            equals: id,
          },
          removedAt: {
            equals: null,
          },
        },
      },
    });

    return driver;
  }

  async getByName(name: string): Promise<Driver[]> {
    const drivers = await prismaClient.driver.findMany({
      where: {
        AND: {
          name: {
            contains: name,
          },
          removedAt: {
            equals: null,
          },
        },
      },
    });

    return drivers;
  }

  async getNamesCarsDrivers(): Promise<Partial<Driver>[]> {
    const drivers = await prismaClient.driver.findMany({
      select: {
        name: true,
        carDrivers: true,
      },
      where: {
        removedAt: {
          equals: null,
        },
      },
    });

    return drivers;
  }
  async update(id: number, name: string): Promise<void> {
    await prismaClient.driver.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });
  }
  async remove(id: number): Promise<void> {
    await prismaClient.driver.update({
      where: {
        id,
      },
      data: {
        removedAt: new Date(),
      },
    });
  }
}
