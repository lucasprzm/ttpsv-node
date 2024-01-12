import { InMemoryDriversRepository } from "../../tests/repositories/InMemoryDriversRepository";
import { GetByNameDriver } from "./GetByNameDriver";

test("get drivers by name", async () => {
  const inMemorydriversRepository = new InMemoryDriversRepository();
  const getByNameDriver = new GetByNameDriver(inMemorydriversRepository);

  await expect(getByNameDriver.execute("Motorista 1")).resolves.not.toThrow();
  expect(inMemorydriversRepository.drivers[0].name).toBe("Motorista 1");
  expect(inMemorydriversRepository.drivers[1].name).toBe("Motorista 1");
});

test("should not be able to get a driver with an invalid name", async () => {
  const inMemorydriversRepository = new InMemoryDriversRepository();
  const getByNameDriver = new GetByNameDriver(inMemorydriversRepository);

  await expect(getByNameDriver.execute("")).rejects.toThrow();
});

test("should not be able to find any driver", async () => {
  const inMemorydriversRepository = new InMemoryDriversRepository();
  const getByNameDriver = new GetByNameDriver(inMemorydriversRepository);
  inMemorydriversRepository.failTestGetByName = true;

  await expect(getByNameDriver.execute("Motorista 1")).resolves.not.toThrow();
  expect(inMemorydriversRepository.drivers.length).toBe(0);
});
