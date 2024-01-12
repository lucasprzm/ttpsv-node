import { Car } from "@prisma/client";
import { prismaClient } from "../../../prisma/prismaClient";
import { CarsRepository, ICreateCarDTO } from "../CarsRepository";

export class PrismaCarsRepository implements CarsRepository {
  async getById(id: number): Promise<Car> {
    const car = await prismaClient.car.findFirst({
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
    if (!car) {
      throw new Error("Carro não encontrado.");
    }
    return car;
  }
  async getByBrandColor(brand?: string | undefined, color?: string | undefined): Promise<Car[]> {
    const cars = await prismaClient.car.findMany({
      where: {
        AND: {
          brand: {
            contains: brand,
          },
          color: {
            contains: color,
          },
          removedAt: {
            equals: null,
          },
        },
      },
    });

    return cars;
  }

  async update(
    id: number,
    plate?: string | undefined,
    brand?: string | undefined,
    color?: string | undefined
  ): Promise<void> {
    await prismaClient.car.update({
      where: {
        id,
      },
      data: {
        plate,
        brand,
        color,
      },
    });
  }

  async remove(id: number): Promise<void> {
    await prismaClient.car.update({
      where: {
        id,
      },
      data: {
        removedAt: new Date(),
      },
    });
  }

  async create(data: ICreateCarDTO) {
    const car = await prismaClient.car.create({
      data,
    });
    return car;
  }
}
