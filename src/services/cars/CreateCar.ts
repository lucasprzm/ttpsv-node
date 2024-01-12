import { prismaClient } from "../../../prisma/prismaClient";
import { CarsRepository } from "../../repositories/CarsRepository";

interface ICreateCarRequest {
  plate: string;
  brand: string;
  color: string;
}

export class CreateCar {
  constructor(private carsRepository: CarsRepository) {}
  async execute({ plate, brand, color }: ICreateCarRequest) {
    if (!plate) {
      throw new Error("Placa é obrigatória.");
    }
    if (!brand) {
      throw new Error("Marca é obrigatória.");
    }
    if (!color) {
      throw new Error("Cor é obrigatória.");
    }
    const carAlreadyExists = await prismaClient.car.findFirst({
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
    if (carAlreadyExists) {
      throw new Error("Carro já cadastrado.");
    }

    const car = await this.carsRepository.create({
      plate,
      brand,
      color,
    });
    return car;
  }
}
