import { CarsRepository } from "../../repositories/CarsRepository";

interface IUpdateCarRequest {
  id: string;
  plate: string;
  brand: string;
  color: string;
}

export class UpdateCar {
  constructor(private carsRepository: CarsRepository) {}

  async execute({ id, plate, brand, color }: IUpdateCarRequest) {
    if (!id) {
      throw new Error("Id é obrigatório.");
    }
    if (!plate) {
      throw new Error("Placa é obrigatória.");
    }
    if (!brand) {
      throw new Error("Marca é obrigatória.");
    }
    if (!color) {
      throw new Error("Cor é obrigatória.");
    }
    const car = await this.carsRepository.getById(Number(id));
    if (!car) {
      throw new Error("Carro não encontrado.");
    }

    const plateBeingUsed = await this.carsRepository.getByPlate(plate);
    if (plateBeingUsed) {
      throw new Error("Placa já está sendo utilizada.");
    }

    await this.carsRepository.update(Number(id), plate, brand, color);
  }
}
