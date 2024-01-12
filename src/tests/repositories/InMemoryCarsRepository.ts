import { Car } from "@prisma/client";
import { CarsRepository, ICreateCarDTO } from "../../repositories/CarsRepository";

export class InMemoryCarsRepository implements CarsRepository {
  public cars: Car[] = [];
  public car: Car = {} as Car;

  async create(data: ICreateCarDTO) {
    const car = {
      id: 2,
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

  async getById(id: number): Promise<Car> {
    const car = {
      id: 1,
      plate: "ABC-1234",
      brand: "Fiat",
      color: "Branco",
      createdAt: new Date(),
      updatedAt: new Date(),
      removedAt: null,
    };
    this.car = car;

    return car;
  }

  getByBrandColor(
    brand?: string | undefined,
    color?: string | undefined
  ): Promise<
    {
      id: number;
      plate: string;
      brand: string;
      color: string;
      createdAt: Date;
      updatedAt: Date;
      removedAt: Date | null;
    }[]
  > {
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
  remove(id: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
