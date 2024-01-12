import { CarsRepository } from "../../repositories/CarsRepository";

export class GetByBrandColor {
  constructor(private carsRepository: CarsRepository) {}
  async execute(brand?: string, color?: string) {
    const cars = await this.carsRepository.getByBrandColor(brand, color);
    if (cars.length === 0) {
      throw new Error("Nenhum carro encontrado.");
    }
    return cars;
  }
}
