import { DriversRepository } from "../../repositories/DriversRepository";

export class GetByIdDriver {
  constructor(private driversRepository: DriversRepository) {}
  async execute(id: number) {
    const driver = await this.driversRepository.getById(id);
    if (!driver) {
      throw new Error("Motorista não encontrado.");
    }
    return driver;
  }
}
