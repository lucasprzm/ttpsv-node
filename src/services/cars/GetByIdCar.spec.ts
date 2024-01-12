import { InMemoryCarsRepository } from "../../tests/repositories/InMemoryCarsRepository";
import { GetByIdCar } from "./GetByIdCar";

test("get a car by Id", async () => {
  const inMemoryCarsRepository = new InMemoryCarsRepository();
  const getByIdCar = new GetByIdCar(inMemoryCarsRepository);

  await expect(getByIdCar.execute(1)).resolves.not.toThrow();
  expect(inMemoryCarsRepository.car).toEqual(
    expect.objectContaining({
      id: 1,
    })
  );
});

test("should not be able to get a car by Id", async () => {
  const inMemoryCarsRepository = new InMemoryCarsRepository();
  const getByIdCar = new GetByIdCar(inMemoryCarsRepository);
  inMemoryCarsRepository.failTestGetById = true;

  await expect(getByIdCar.execute(2)).rejects.toThrow();
});
