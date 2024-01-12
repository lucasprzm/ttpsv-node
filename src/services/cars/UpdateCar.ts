import { prismaClient } from "../../../prisma/prismaClient";
import { CarsRepository } from "../../repositories/CarsRepository";

interface IUpdateCarRequest {
  id: string;
  plate?: string;
  brand?: string;
  color?: string;
}

export class UpdateCar {
  constructor(private carsRepository: CarsRepository) {}

  async execute({ id, plate, brand, color }: IUpdateCarRequest) {
    const car = await prismaClient.car.findFirst({
      where: {
        AND: {
          id: {
            equals: Number(id),
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

    const plateBeingUsed = await prismaClient.car.findFirst({
      where: {
        AND: {
          plate: {
            equals: plate,
          },
          removedAt: {
            equals: null,
          },
        },
      },
    });
    if (plateBeingUsed) {
      throw new Error("Placa já está sendo utilizada.");
    }

    await this.carsRepository.update(Number(id), plate, brand, color);
  }
}
