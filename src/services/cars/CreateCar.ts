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
    if (!/^[A-Z]{3}\d{4}$/i.test(plate) && !/^[A-Z]{3}\d[A-Z]\d{2}$/i.test(plate)) {
      throw new Error("Placa inválida. Utilize o formato AAA0000 ou ABC1D23.");
    }
    if (!brand) {
      throw new Error("Marca é obrigatória.");
    }
    if (!color) {
      throw new Error("Cor é obrigatória.");
    }
    const carAlreadyExists = await this.carsRepository.getByPlate(plate);
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
