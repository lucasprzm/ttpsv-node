import { DriversRepository } from "../../repositories/DriversRepository";

export class RemoveDriver {
  constructor(private driversRepository: DriversRepository) {}

  async execute(id: number) {
    if (!id) {
      throw new Error("Id não informado.");
    }
    const driver = await this.driversRepository.getById(id);
    if (!driver) {
      throw new Error("Motorista não encontrado.");
    }
    await this.driversRepository.remove(id);
  }
}
