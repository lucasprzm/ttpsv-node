import { prismaClient } from "../../../prisma/prismaClient";
import { DriversRepository } from "../../repositories/DriversRepository";

export class UpdateDriver {
  constructor(private driversRepository: DriversRepository) {}

  async execute(id: number, name: string) {
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
    if (!driver) {
      throw new Error("Motorista não encontrado.");
    }

    const driverAlreadyExists = await prismaClient.driver.findFirst({
      where: {
        AND: {
          name: {
            equals: name,
          },
          removedAt: {
            equals: null,
          },
        },
      },
    });

    if (driverAlreadyExists) {
      throw new Error("Motorista já cadastrado.");
    }

    await this.driversRepository.update(id, name);
  }
}
