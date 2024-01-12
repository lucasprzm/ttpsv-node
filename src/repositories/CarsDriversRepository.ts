import { CarDriver } from "@prisma/client";

export interface ICreateCarDriverDTO {
  carId: number;
  driverId: number;
  reason: string;
}

export interface CarsDriversRepository {
  create(data: ICreateCarDriverDTO): Promise<CarDriver>;
  finishedUsing(id: number): Promise<void>;
}
