import { CarDriver } from "@prisma/client";
import {
  CarsDriversRepository,
  ICreateCarDriverDTO,
} from "../../repositories/CarsDriversRepository";

export class InMemoryCarsDriversRepository implements CarsDriversRepository {
  public carDriver: CarDriver = {} as CarDriver;
  public failTestGetByIdAndFinishedUsingNull: boolean = false;
  public failTestGetByIdAndFinishedUsingNotNull: boolean = false;
  public failTestGetByCarIdDriverIdAndFinishedUsingNull: boolean = false;
  public failTestGetByCarIdAndFinishedUsingNull: boolean = false;
  public failTestGetByDriverIdAndFinishedUsingNull: boolean = false;

  async create(data: ICreateCarDriverDTO): Promise<CarDriver> {
    const carDriver = {
      id: Math.floor(Math.random() * 100),
      driverId: data.driverId,
      carId: data.carId,
      reason: data.reason,
      startedUsing: new Date(),
      finishedUsing: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      removedAt: null,
    };
    this.carDriver = carDriver;

    return carDriver;
  }

  async finishedUsing(id: number): Promise<void> {
    const carDriver = {
      id,
      driverId: Math.floor(Math.random() * 100),
      carId: Math.floor(Math.random() * 100),
      reason: "Teste",
      startedUsing: new Date(),
      finishedUsing: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      removedAt: null,
    };
    this.carDriver = carDriver;
  }
  async getByIdAndFinishedUsingNull(id: number): Promise<CarDriver | null> {
    if (this.failTestGetByIdAndFinishedUsingNull) {
      return null;
    }
    const carDriver = {
      id,
      driverId: Math.floor(Math.random() * 100),
      carId: Math.floor(Math.random() * 100),
      reason: "Teste",
      startedUsing: new Date(),
      finishedUsing: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      removedAt: null,
    };
    this.carDriver = carDriver;
    return carDriver;
  }
  async getByIdAndFinishedUsingNotNull(id: number): Promise<CarDriver | null> {
    if (this.failTestGetByIdAndFinishedUsingNotNull) {
      return null;
    }
    const carDriver = {
      id,
      driverId: Math.floor(Math.random() * 100),
      carId: Math.floor(Math.random() * 100),
      reason: "Teste",
      startedUsing: new Date(),
      finishedUsing: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      removedAt: null,
    };
    this.carDriver = carDriver;
    return carDriver;
  }
  async getByCarIdDriverIdAndFinishedUsingNull(
    carId: number,
    driverId: number
  ): Promise<CarDriver | null> {
    if (this.failTestGetByCarIdDriverIdAndFinishedUsingNull) {
      return null;
    }
    const carDriver = {
      id: Math.floor(Math.random() * 100),
      driverId,
      carId,
      reason: "Teste",
      startedUsing: new Date(),
      finishedUsing: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      removedAt: null,
    };
    this.carDriver = carDriver;
    return carDriver;
  }
  async getByCarIdAndFinishedUsingNull(carId: number): Promise<CarDriver | null> {
    if (this.failTestGetByCarIdAndFinishedUsingNull) {
      return null;
    }
    const carDriver = {
      id: Math.floor(Math.random() * 100),
      driverId: Math.floor(Math.random() * 100),
      carId,
      reason: "Teste",
      startedUsing: new Date(),
      finishedUsing: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      removedAt: null,
    };
    this.carDriver = carDriver;
    return carDriver;
  }
  async getByDriverIdAndFinishedUsingNull(driverId: number): Promise<CarDriver | null> {
    if (this.failTestGetByDriverIdAndFinishedUsingNull) {
      return null;
    }
    const carDriver = {
      id: Math.floor(Math.random() * 100),
      driverId,
      carId: Math.floor(Math.random() * 100),
      reason: "Teste",
      startedUsing: new Date(),
      finishedUsing: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      removedAt: null,
    };
    this.carDriver = carDriver;
    return carDriver;
  }
}
