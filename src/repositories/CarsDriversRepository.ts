import { CarDriver } from "@prisma/client";

export interface ICreateCarDriverDTO {
  carId: number;
  driverId: number;
  reason: string;
}

export interface CarsDriversRepository {
  create(data: ICreateCarDriverDTO): Promise<CarDriver>;
  finishedUsing(id: number): Promise<void>;
  getByCarIdDriverIdAndFinishedUsingNull(
    carId: number,
    driverId: number
  ): Promise<CarDriver | null>;
  getByCarIdAndFinishedUsingNull(carId: number): Promise<CarDriver | null>;
  getByDriverIdAndFinishedUsingNull(driverId: number): Promise<CarDriver | null>;
}
