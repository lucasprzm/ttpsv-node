import { CarsRepository } from "../../repositories/CarsRepository";

export class RemoveCar {
  constructor(private carsRepository: CarsRepository) {}

  async execute(id: number) {
    const car = await this.carsRepository.getById(id);
    if (!car) {
      throw new Error("Carro não encontrado.");
    }

    await this.carsRepository.remove(id);
  }
}
