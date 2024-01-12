import { DriversRepository } from "../../repositories/DriversRepository";

export class GetNamesCarsDriversDriver {
  constructor(private driversRepository: DriversRepository) {}

  async execute() {
    const drivers = await this.driversRepository.getNamesCarsDrivers();
    if (drivers.length === 0) {
      throw new Error("Nenhum motorista encontrado.");
    }
    return drivers;
  }
}
