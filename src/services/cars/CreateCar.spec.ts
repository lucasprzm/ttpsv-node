import e from "express";
import { InMemoryCarsRepository } from "../../tests/repositories/InMemoryCarsRepository";
import { CreateCar } from "./CreateCar";

test("create car", async () => {
  const inMemoryCarsRepository = new InMemoryCarsRepository();
  const createCar = new CreateCar(inMemoryCarsRepository);

  await expect(
    createCar.execute({
      plate: "ABC-1234",
      brand: "Fiat",
      color: "Branco",
    })
  ).resolves.not.toThrow();

  expect(inMemoryCarsRepository.cars.length).toBe(1);
  expect(inMemoryCarsRepository.cars).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        plate: "ABC-1234",
        brand: "Fiat",
        color: "Branco",
      }),
    ])
  );
});
