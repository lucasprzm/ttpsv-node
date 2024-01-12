import { Driver } from "@prisma/client";

export interface ICreateDriverDTO {
  name: string;
}

export interface DriversRepository {
  create(data: ICreateDriverDTO): Promise<Driver>;
  getById(id: number): Promise<Driver | null>;
  getByName(name: string): Promise<Driver[]>;
  getByFullName(name: string): Promise<Driver | null>;
  getNamesCarsDrivers(): Promise<Partial<Driver>[]>;
  update(id: number, name: string): Promise<void>;
  remove(id: number): Promise<void>;
}
