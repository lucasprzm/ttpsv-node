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

test("should not be able to create a car without a plate", async () => {
  const inMemoryCarsRepository = new InMemoryCarsRepository();
  const createCar = new CreateCar(inMemoryCarsRepository);

  await expect(
    createCar.execute({
      plate: "",
      brand: "Fiat",
      color: "Branco",
    })
  ).rejects.toThrow();
});
test("should not be able to create a car without a brand", async () => {
  const inMemoryCarsRepository = new InMemoryCarsRepository();
  const createCar = new CreateCar(inMemoryCarsRepository);

  await expect(
    createCar.execute({
      plate: "TTT-1234",
      brand: "",
      color: "Branco",
    })
  ).rejects.toThrow();
});

test("should not be able to create a car without a color", async () => {
  const inMemoryCarsRepository = new InMemoryCarsRepository();
  const createCar = new CreateCar(inMemoryCarsRepository);

  await expect(
    createCar.execute({
      plate: "FGV-1234",
      brand: "Fiat",
      color: "",
    })
  ).rejects.toThrow();
});

test("should not be able to create a car with an existing plate", async () => {
  const inMemoryCarsRepository = new InMemoryCarsRepository();
  const createCar = new CreateCar(inMemoryCarsRepository);
  inMemoryCarsRepository.failTestGetByPlate = true;

  await expect(
    createCar.execute({
      plate: "ABC-1234",
      brand: "Fiat",
      color: "Branco",
    })
  ).rejects.toThrow();
});
