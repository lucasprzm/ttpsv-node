import { InMemoryCarsDriversRepository } from "../../tests/repositories/InMemoryCarsDriversRepository";
import { CreateCarDriver } from "./CreateCarDriver";

test("create a carDriver", async () => {
  const inMemoryCarsDriversRepository = new InMemoryCarsDriversRepository();
  const createCarDriver = new CreateCarDriver(inMemoryCarsDriversRepository);
  inMemoryCarsDriversRepository.failTestGetByCarIdDriverIdAndFinishedUsingNull = true;
  inMemoryCarsDriversRepository.failTestGetByCarIdAndFinishedUsingNull = true;
  inMemoryCarsDriversRepository.failTestGetByDriverIdAndFinishedUsingNull = true;

  await expect(
    createCarDriver.execute({ carId: 1, driverId: 1, reason: "Teste" })
  ).resolves.not.toThrow();
  expect(inMemoryCarsDriversRepository.carDriver.carId).toBe(1);
  expect(inMemoryCarsDriversRepository.carDriver.driverId).toBe(1);
  expect(inMemoryCarsDriversRepository.carDriver.reason).toBe("Teste");
});

test("fail to create a carDriver without carId", async () => {
  const inMemoryCarsDriversRepository = new InMemoryCarsDriversRepository();
  const createCarDriver = new CreateCarDriver(inMemoryCarsDriversRepository);

  await expect(
    createCarDriver.execute({ carId: NaN, driverId: 1, reason: "Teste" })
  ).rejects.toThrow("Carro não informado.");
});

test("fail to create a carDriver without driverId", async () => {
  const inMemoryCarsDriversRepository = new InMemoryCarsDriversRepository();
  const createCarDriver = new CreateCarDriver(inMemoryCarsDriversRepository);

  await expect(
    createCarDriver.execute({ carId: 1, driverId: NaN, reason: "Teste" })
  ).rejects.toThrow("Motorista não informado.");
});

test("fail to create a carDriver without reason", async () => {
  const inMemoryCarsDriversRepository = new InMemoryCarsDriversRepository();
  const createCarDriver = new CreateCarDriver(inMemoryCarsDriversRepository);

  await expect(createCarDriver.execute({ carId: 1, driverId: 1, reason: "" })).rejects.toThrow(
    "Motivo não informado."
  );
});

test("fail to create a carDriver if car is already being used", async () => {
  const inMemoryCarsDriversRepository = new InMemoryCarsDriversRepository();
  const createCarDriver = new CreateCarDriver(inMemoryCarsDriversRepository);

  inMemoryCarsDriversRepository.failTestGetByCarIdDriverIdAndFinishedUsingNull = true;

  await expect(createCarDriver.execute({ carId: 1, driverId: 1, reason: "Teste" })).rejects.toThrow(
    "Automóvel já está sendo utilizado."
  );
});

test("fail to create a carDriver if driver is already being used", async () => {
  const inMemoryCarsDriversRepository = new InMemoryCarsDriversRepository();
  const createCarDriver = new CreateCarDriver(inMemoryCarsDriversRepository);

  inMemoryCarsDriversRepository.failTestGetByCarIdDriverIdAndFinishedUsingNull = true;
  inMemoryCarsDriversRepository.failTestGetByCarIdAndFinishedUsingNull = true;

  await expect(createCarDriver.execute({ carId: 1, driverId: 1, reason: "Teste" })).rejects.toThrow(
    "Motorista já está alocado em outro carro."
  );
});

test("fail to create a carDriver if car and driver are already being used", async () => {
  const inMemoryCarsDriversRepository = new InMemoryCarsDriversRepository();
  const createCarDriver = new CreateCarDriver(inMemoryCarsDriversRepository);

  await expect(createCarDriver.execute({ carId: 1, driverId: 1, reason: "Teste" })).rejects.toThrow(
    "Motorista já está alocado neste carro."
  );
});
