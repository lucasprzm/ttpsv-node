import { DriversRepository } from "../../repositories/DriversRepository";

interface ICreateDriverRequest {
  name: string;
}

export class CreateDriver {
  constructor(private driversRepository: DriversRepository) {}

  async execute(data: ICreateDriverRequest) {
    const driverAlreadyExists = await this.driversRepository.getByName(data.name);
    if (driverAlreadyExists.length > 0) {
      throw new Error("Motorista já cadastrado.");
    }

    const driver = await this.driversRepository.create(data);
    return driver;
  }
}
