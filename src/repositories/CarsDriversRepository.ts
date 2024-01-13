import { CarDriver } from "@prisma/client";

export interface ICreateCarDriverDTO {
  carId: number;
  driverId: number;
  reason: string;
}

export interface CarsDriversRepository {
  create(data: ICreateCarDriverDTO): Promise<CarDriver>;
  finishedUsing(id: number): Promise<void>;
  getByIdAndFinishedUsingNull(id: number): Promise<CarDriver | null>;
  getByIdAndFinishedUsingNotNull(id: number): Promise<CarDriver | null>;
  getByCarIdDriverIdAndFinishedUsingNull(
    carId: number,
    driverId: number
  ): Promise<CarDriver | null>;
  getByCarIdAndFinishedUsingNull(carId: number): Promise<CarDriver | null>;
  getByDriverIdAndFinishedUsingNull(driverId: number): Promise<CarDriver | null>;
}
