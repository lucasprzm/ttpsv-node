import { InMemoryDriversRepository } from "../../tests/repositories/InMemoryDriversRepository";
import { RemoveDriver } from "./RemoveDriver";

test("remove driver", async () => {
  const inMemoryDriversRepository = new InMemoryDriversRepository();
  const removeDriver = new RemoveDriver(inMemoryDriversRepository);

  await expect(removeDriver.execute(1)).resolves.not.toThrow();
  expect(inMemoryDriversRepository.driver.removedAt).not.toBeNull();
  expect(inMemoryDriversRepository.driver.id).toBe(1);
});

test("should not be able to remove a driver that does not exist", async () => {
  const inMemoryDriversRepository = new InMemoryDriversRepository();
  const removeDriver = new RemoveDriver(inMemoryDriversRepository);
  inMemoryDriversRepository.failTestGetById = true;

  await expect(removeDriver.execute(1)).rejects.toThrow();
});

test("should not be able to remove a driver with empty id", async () => {
  const inMemoryDriversRepository = new InMemoryDriversRepository();
  const removeDriver = new RemoveDriver(inMemoryDriversRepository);

  await expect(removeDriver.execute(NaN)).rejects.toThrow();
});
