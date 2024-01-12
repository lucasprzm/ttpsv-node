import { InMemoryDriversRepository } from "../../tests/repositories/InMemoryDriversRepository";
import { GetByIdDriver } from "./GetByIdDriver";

test("get driver by id", async () => {
  const inMemorydriversRepository = new InMemoryDriversRepository();
  const getByIdDriver = new GetByIdDriver(inMemorydriversRepository);

  const driver = await getByIdDriver.execute(1);
  expect(driver.id).toBe(1);
  expect(driver.name).toBe(inMemorydriversRepository.driver.name);
  expect(driver.createdAt).toBe(inMemorydriversRepository.driver.createdAt);
  expect(driver.updatedAt).toBe(inMemorydriversRepository.driver.updatedAt);
});

test("should not be able to get a driver with an invalid id", async () => {
  const inMemorydriversRepository = new InMemoryDriversRepository();
  const getByIdDriver = new GetByIdDriver(inMemorydriversRepository);
  inMemorydriversRepository.failTestGetById = true;

  await expect(getByIdDriver.execute(0)).rejects.toThrow();
});
