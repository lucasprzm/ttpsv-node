import { InMemoryDriversRepository } from "../../tests/repositories/InMemoryDriversRepository";
import { CreateDriver } from "./CreateDriver";

test("create a driver", async () => {
  const inMemoryDriversRepository = new InMemoryDriversRepository();
  const createDriver = new CreateDriver(inMemoryDriversRepository);
  inMemoryDriversRepository.failTestGetByFullName = true;

  await expect(
    createDriver.execute({
      name: "Motorista 1",
    })
  ).resolves.not.toThrow();
  expect(inMemoryDriversRepository.driver.name).toBe("Motorista 1");
});

test("should not be able to create a driver without a name", async () => {
  const inMemoryDriversRepository = new InMemoryDriversRepository();
  const createDriver = new CreateDriver(inMemoryDriversRepository);

  await expect(
    createDriver.execute({
      name: "",
    })
  ).rejects.toThrow();
});

test("should not be able to create a driver with a name that already exists", async () => {
  const inMemoryDriversRepository = new InMemoryDriversRepository();
  const createDriver = new CreateDriver(inMemoryDriversRepository);

  await expect(
    createDriver.execute({
      name: "Motorista 1",
    })
  ).rejects.toThrow();
});
