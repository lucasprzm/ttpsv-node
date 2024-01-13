import { InMemoryDriversRepository } from "../../tests/repositories/InMemoryDriversRepository";
import { GetNamesCarsDriversDriver } from "./GetNamesCarsDriversDriver";

test("get names and cars of drivers", async () => {
  const inMemoryDriversRepository = new InMemoryDriversRepository();
  const getNamesCarsDriversDriver = new GetNamesCarsDriversDriver(inMemoryDriversRepository);

  await expect(getNamesCarsDriversDriver.execute()).resolves.not.toThrow();
  expect(inMemoryDriversRepository.partialDrivers.length).toBe(2);
  expect(inMemoryDriversRepository.partialDrivers[0].name).toBe("Motorista 1");
  expect(inMemoryDriversRepository.partialDrivers[1].name).toBe("Motorista 2");
});

test("should not be able to get any names and cars of drivers", async () => {
  const inMemoryDriversRepository = new InMemoryDriversRepository();
  const getNamesCarsDriversDriver = new GetNamesCarsDriversDriver(inMemoryDriversRepository);
  inMemoryDriversRepository.failTestGetNamesCarsDrivers = true;

  await expect(getNamesCarsDriversDriver.execute()).resolves.not.toThrow();
  expect(inMemoryDriversRepository.partialDrivers.length).toBe(0);
});
