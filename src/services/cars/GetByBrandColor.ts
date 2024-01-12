import { CarsRepository } from "../../repositories/CarsRepository";

export class GetByBrandColor {
  constructor(private carsRepository: CarsRepository) {}
  async execute(brand?: string, color?: string) {
    if (!brand && !color) {
      throw new Error("Informe a marca ou a cor do carro.");
    }
    const cars = await this.carsRepository.getByBrandColor(brand, color);

    return cars;
  }
}
