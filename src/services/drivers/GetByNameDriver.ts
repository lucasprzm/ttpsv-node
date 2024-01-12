import { DriversRepository } from "../../repositories/DriversRepository";

export class GetByNameDriver {
  constructor(private driversRepository: DriversRepository) {}
  async execute(name: string) {
    if (!name) {
      throw new Error("Nome é obrigatório.");
    }
    const drivers = await this.driversRepository.getByName(name);

    return drivers;
  }
}
