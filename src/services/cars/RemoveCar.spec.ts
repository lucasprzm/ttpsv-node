import { InMemoryCarsRepository } from "../../tests/repositories/InMemoryCarsRepository";
import { RemoveCar } from "./RemoveCar";

test("remove a car", async () => {
  const inMemoryCarsRepository = new InMemoryCarsRepository();
  const removeCar = new RemoveCar(inMemoryCarsRepository);

  await expect(removeCar.execute(1)).resolves.not.toThrow();
  expect(inMemoryCarsRepository.car.removedAt).not.toBeNull();
});

test("should not be able to remove a car that does not exist", async () => {
  const inMemoryCarsRepository = new InMemoryCarsRepository();
  const removeCar = new RemoveCar(inMemoryCarsRepository);
  inMemoryCarsRepository.failTestGetById = true;

  await expect(removeCar.execute(1)).rejects.toThrow();
});
