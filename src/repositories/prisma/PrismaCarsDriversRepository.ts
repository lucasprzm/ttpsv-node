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
}
