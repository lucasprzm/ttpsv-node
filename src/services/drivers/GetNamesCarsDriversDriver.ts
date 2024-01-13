import { DriversRepository } from "../../repositories/DriversRepository";

export class GetNamesCarsDriversDriver {
  constructor(private driversRepository: DriversRepository) {}

  async execute() {
    const drivers = await this.driversRepository.getNamesCarsDrivers();

    return drivers;
  }
}
