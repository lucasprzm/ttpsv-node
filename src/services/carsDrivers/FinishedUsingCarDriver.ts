import { prismaClient } from "../../../prisma/prismaClient";
import { CarsDriversRepository } from "../../repositories/CarsDriversRepository";

export class FinishedUsingCarDriver {
  constructor(private carsDriversRepository: CarsDriversRepository) {}
  async execute(id: number) {
    const carDriver = await this.carsDriversRepository.getByIdAndFinishedUsingNull(id);
    if (!carDriver) {
      throw new Error("Carro/motorista não encontrado.");
    }

    const carDriverAlreadyFinished =
      await this.carsDriversRepository.getByIdAndFinishedUsingNotNull(id);

    if (carDriverAlreadyFinished) {
      throw new Error("Carro/motorista já finalizado.");
    }

    await this.carsDriversRepository.finishedUsing(id);
  }
}
