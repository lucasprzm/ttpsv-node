import { Car } from "@prisma/client";
import { CarsRepository, ICreateCarDTO } from "../../repositories/CarsRepository";

export class InMemoryCarsRepository implements CarsRepository {
  getById(id: number): Promise<Car> {
    throw new Error("Method not implemented.");
  }
  getByBrandColor(brand?: string | undefined, color?: string | undefined): Promise<Car> {
    throw new Error("Method not implemented.");
  }
  update(
    id: number,
    plate?: string | undefined,
    brand?: string | undefined,
    color?: string | undefined
  ): Promise<void> {
    throw new Error("Method not implemented.");
  }
  remove(id: number): Promise<Car[]> {
    throw new Error("Method not implemented.");
  }
  public cars: Car[] = [];
  async create(data: ICreateCarDTO) {
    const car = {
      id: Math.random(),
      plate: data.plate,
      brand: data.brand,
      color: data.color,
      createdAt: new Date(),
      updatedAt: new Date(),
      removedAt: null,
    };
    this.cars.push(car);

    return car;
  }
}
