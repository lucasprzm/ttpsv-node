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
    const carAlreadyExists = await prismaClient.car.findFirst({
      where: {
        plate,
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
