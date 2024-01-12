import { Car } from "@prisma/client";

export interface ICreateCarDTO {
  plate: string;
  brand: string;
  color: string;
}

export interface CarsRepository {
  create(data: ICreateCarDTO): Promise<Car | null>;
  getById(id: number): Promise<Car | null>;
  getByPlate(plate: string): Promise<Car | null>;
  getByBrandColor(brand?: string, color?: string): Promise<Car[]>;
  update(id: number, plate: string, brand: string, color: string): Promise<void>;
  remove(id: number): Promise<void>;
}
