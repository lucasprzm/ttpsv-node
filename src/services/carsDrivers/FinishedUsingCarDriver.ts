import { prismaClient } from "../../../prisma/prismaClient";
import { CarsDriversRepository } from "../../repositories/CarsDriversRepository";

export class FinishedUsingCarDriver {
  constructor(private carsDriversRepository: CarsDriversRepository) {}
  async execute(id: number) {
    const carDriver = await prismaClient.carDriver.findFirst({
      where: {
        AND: {
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
      },
    });
    if (!carDriver) {
      throw new Error("Carro/motorista não encontrado.");
    }

    const carDriverAlreadyFinished = await prismaClient.carDriver.findFirst({
      where: {
        AND: {
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
      },
    });

    if (carDriverAlreadyFinished) {
      throw new Error("Carro/motorista já finalizado.");
    }

    await this.carsDriversRepository.finishedUsing(id);
  }
}
