import { DriversRepository } from "../../repositories/DriversRepository";

export class UpdateDriver {
  constructor(private driversRepository: DriversRepository) {}

  async execute(id: number, name: string) {
    if (!id) {
      throw new Error("Id não informado.");
    }
    if (!name) {
      throw new Error("Nome não informado.");
    }
    const driver = await this.driversRepository.getById(id);
    if (!driver) {
      throw new Error("Motorista não encontrado.");
    }

    const driverAlreadyExists = await this.driversRepository.getByFullName(name);
    if (driverAlreadyExists) {
      throw new Error("Motorista já cadastrado.");
    }

    await this.driversRepository.update(id, name);
  }
}
