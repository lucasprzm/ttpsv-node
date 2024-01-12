import { DriversRepository } from "../../repositories/DriversRepository";

export class GetByNameDriver {
  constructor(private driversRepository: DriversRepository) {}
  async execute(name: string) {
    const drivers = await this.driversRepository.getByName(name);
    if (drivers.length === 0) {
      throw new Error("Nenhum motorista encontrado.");
    }
    return drivers;
  }
}
