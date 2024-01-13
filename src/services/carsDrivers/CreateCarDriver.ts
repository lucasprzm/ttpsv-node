import { CarsDriversRepository } from "../../repositories/CarsDriversRepository";

interface ICreateCarDriverRequest {
  carId: number;
  driverId: number;
  reason: string;
}

export class CreateCarDriver {
  constructor(private carsDriversRepository: CarsDriversRepository) {}

  async execute(data: ICreateCarDriverRequest) {
    if (!data.carId) {
      throw new Error("Carro não informado.");
    }

    if (!data.driverId) {
      throw new Error("Motorista não informado.");
    }

    if (!data.reason) {
      throw new Error("Motivo não informado.");
    }

    const carDriverAlreadyExists =
      await this.carsDriversRepository.getByCarIdDriverIdAndFinishedUsingNull(
        data.carId,
        data.driverId
      );

    if (carDriverAlreadyExists) {
      throw new Error("Motorista já está alocado neste carro.");
    }

    const carBeingUsed = await this.carsDriversRepository.getByCarIdAndFinishedUsingNull(
      data.carId
    );

    if (carBeingUsed) {
      throw new Error("Automóvel já está sendo utilizado.");
    }

    const driverBeingUsed = await this.carsDriversRepository.getByDriverIdAndFinishedUsingNull(
      data.driverId
    );

    if (driverBeingUsed) {
      throw new Error("Motorista já está alocado em outro carro.");
    }

    const carDriver = await this.carsDriversRepository.create(data);

    return carDriver;
  }
}
