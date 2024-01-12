import { CarsRepository } from "../../repositories/CarsRepository";

export class GetByIdCar {
  constructor(private carsRepository: CarsRepository) {}
  async execute(id: number) {
    const car = await this.carsRepository.getById(id);
    if (!car) {
      throw new Error("Carro não encontrado.");
    }
    return car;
  }
}
