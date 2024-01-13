import { DriversRepository, ICreateDriverDTO } from "../../repositories/DriversRepository";
import { Driver } from "@prisma/client";

export class InMemoryDriversRepository implements DriversRepository {
  public drivers: Driver[] = [];
  public driver: Driver = {} as Driver;
  public partialDrivers: Partial<Driver>[] = [];
  public failTestGetById: boolean = false;
  public failTestGetByName: boolean = false;
  public failTestGetByFullName: boolean = false;
  public failTestGetNamesCarsDrivers: boolean = false;

  async create(data: ICreateDriverDTO): Promise<Driver> {
    const driver = {
      id: Math.floor(Math.random() * 100),
      name: data.name,
      createdAt: new Date(),
      updatedAt: new Date(),
      removedAt: null,
    };
    this.driver = driver;

    return driver;
  }

  async getById(id: number): Promise<Driver | null> {
    if (this.failTestGetById) {
      return null;
    }
    const driver = {
      id,
      name: "Motorista 1",
      createdAt: new Date(),
      updatedAt: new Date(),
      removedAt: null,
    };
    this.driver = driver;

    return driver;
  }

  async getByName(name: string): Promise<Driver[]> {
    const drivers: Driver[] = [];
    if (this.failTestGetByName) {
      return drivers;
    }

    const driver1 = {
      id: Math.floor(Math.random() * 100),
      name,
      createdAt: new Date(),
      updatedAt: new Date(),
      removedAt: null,
    };
    this.drivers.push(driver1);
    drivers.push(driver1);

    const driver2 = {
      id: Math.floor(Math.random() * 100),
      name,
      createdAt: new Date(),
      updatedAt: new Date(),
      removedAt: null,
    };
    this.drivers.push(driver2);
    drivers.push(driver2);
    return drivers;
  }

  async getByFullName(name: string): Promise<Driver | null> {
    if (this.failTestGetByFullName) {
      return null;
    }
    const driver = {
      id: Math.floor(Math.random() * 100),
      name,
      createdAt: new Date(),
      updatedAt: new Date(),
      removedAt: null,
    };
    this.driver = driver;

    return driver;
  }

  async getNamesCarsDrivers(): Promise<Partial<Driver>[]> {
    const drivers: Partial<Driver>[] = [];
    if (this.failTestGetNamesCarsDrivers) {
      return drivers;
    }

    const driver1 = {
      name: "Motorista 1",
      carDrivers: [
        {
          car: {
            plate: "ABC-1234",
            color: "Azul",
            brand: "Fiat",
            model: "Uno",
            year: 2010,
            createdAt: new Date(),
            updatedAt: new Date(),
            removedAt: null,
          },
        },
      ],
    };
    this.partialDrivers.push(driver1);
    drivers.push(driver1);

    const driver2 = {
      name: "Motorista 2",
      carDrivers: [
        {
          car: {
            plate: "ABC-1234",
            color: "Azul",
            brand: "Fiat",
            model: "Uno",
            year: 2010,
            createdAt: new Date(),
            updatedAt: new Date(),
            removedAt: null,
          },
        },
      ],
    };
    this.partialDrivers.push(driver2);
    drivers.push(driver2);
    return drivers;
  }

  async update(id: number, name: string): Promise<void> {
    const driver = {
      id,
      name: name,
      createdAt: new Date(),
      updatedAt: new Date(),
      removedAt: null,
    };
    this.driver = driver;
  }

  async remove(id: number): Promise<void> {
    const driver = {
      id,
      name: "Motorista 1",
      createdAt: new Date(),
      updatedAt: new Date(),
      removedAt: new Date(),
    };

    this.driver = driver;
  }
}
