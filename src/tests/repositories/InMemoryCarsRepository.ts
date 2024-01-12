import { Car } from "@prisma/client";
import { CarsRepository, ICreateCarDTO } from "../../repositories/CarsRepository";

export class InMemoryCarsRepository implements CarsRepository {
  public cars: Car[] = [];
  public car: Car = {} as Car;
  public testGetByPlate: boolean = false;
  public failTestGetById: boolean = false;
  public failTest: boolean = false;

  async create(data: ICreateCarDTO) {
    const car = {
      id: Math.floor(Math.random() * 100),
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

  async getById(id: number): Promise<Car | null> {
    if (this.failTestGetById) {
      return null;
    }
    const car = {
      id,
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

  async getByBrandColor(brand?: string | undefined, color?: string | undefined): Promise<Car[]> {
    const cars: Car[] = [];
    if (this.failTest) {
      return cars;
    }
    const car1 = {
      id: Math.floor(Math.random() * 100),
      plate: "ABC-1234",
      brand: brand || "VW",
      color: color || "Branco",
      createdAt: new Date(),
      updatedAt: new Date(),
      removedAt: null,
    };
    this.cars.push(car1);
    cars.push(car1);

    const car2 = {
      id: Math.floor(Math.random() * 100),
      plate: "FGV-1234",
      brand: brand || "Fiat",
      color: color || "Verde",
      createdAt: new Date(),
      updatedAt: new Date(),
      removedAt: null,
    };

    this.cars.push(car2);
    cars.push(car2);

    return cars;
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

  async getByPlate(plate: string): Promise<Car | null> {
    if (!this.testGetByPlate) {
      return null;
    }
    const car = {
      id: 1,
      plate,
      brand: "Fiat",
      color: "Branco",
      createdAt: new Date(),
      updatedAt: new Date(),
      removedAt: null,
    };
    return car;
  }
}
