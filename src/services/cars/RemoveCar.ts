import { CarsRepository } from "../../repositories/CarsRepository";

export class RemoveCar {
  constructor(private carsRepository: CarsRepository) {}

  async execute(id: number) {
    if (!id) {
      throw new Error("Id não informado.");
    }
    const car = await this.carsRepository.getById(id);
    if (!car) {
      throw new Error("Carro não encontrado.");
    }

    await this.carsRepository.remove(id);
  }
}
