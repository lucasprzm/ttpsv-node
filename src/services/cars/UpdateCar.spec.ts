import { InMemoryCarsRepository } from "../../tests/repositories/InMemoryCarsRepository";
import { UpdateCar } from "./UpdateCar";

test("update car", async () => {
  const inMemoryCarsRepository = new InMemoryCarsRepository();
  const updateCar = new UpdateCar(inMemoryCarsRepository);

  await expect(
    updateCar.execute({
      id: "1",
      plate: "FGV1234",
      brand: "Fiat",
      color: "Verde",
    })
  ).resolves.not.toThrow();
  expect(inMemoryCarsRepository.car.id).toBe(1);
  expect(inMemoryCarsRepository.car.plate).toBe("FGV1234");
  expect(inMemoryCarsRepository.car.brand).toBe("Fiat");
  expect(inMemoryCarsRepository.car.color).toBe("Verde");
});

test("should not be able to update a car without an id", async () => {
  const inMemoryCarsRepository = new InMemoryCarsRepository();
  const updateCar = new UpdateCar(inMemoryCarsRepository);

  await expect(
    updateCar.execute({
      id: "",
      plate: "FGV-1234",
      brand: "Fiat",
      color: "Verde",
    })
  ).rejects.toThrow();
});

test("should not be able to update a car without a plate", async () => {
  const inMemoryCarsRepository = new InMemoryCarsRepository();
  const updateCar = new UpdateCar(inMemoryCarsRepository);

  await expect(
    updateCar.execute({
      id: "1",
      plate: "",
      brand: "Fiat",
      color: "Verde",
    })
  ).rejects.toThrow();
});

test("should not be able to update a car without a brand", async () => {
  const inMemoryCarsRepository = new InMemoryCarsRepository();
  const updateCar = new UpdateCar(inMemoryCarsRepository);

  await expect(
    updateCar.execute({
      id: "1",
      plate: "FGV-1234",
      brand: "",
      color: "Verde",
    })
  ).rejects.toThrow();
});

test("should not be able to update a car without a color", async () => {
  const inMemoryCarsRepository = new InMemoryCarsRepository();
  const updateCar = new UpdateCar(inMemoryCarsRepository);

  await expect(
    updateCar.execute({
      id: "1",
      plate: "FGV-1234",
      brand: "Fiat",
      color: "",
    })
  ).rejects.toThrow();
});

test("should not be able to update a car that does not exist", async () => {
  const inMemoryCarsRepository = new InMemoryCarsRepository();
  const updateCar = new UpdateCar(inMemoryCarsRepository);
  inMemoryCarsRepository.failTestGetById = true;

  await expect(
    updateCar.execute({
      id: "1",
      plate: "FGV-1234",
      brand: "Fiat",
      color: "Verde",
    })
  ).rejects.toThrow();
});

test("should not be able to update a car with an existing plate", async () => {
  const inMemoryCarsRepository = new InMemoryCarsRepository();
  const updateCar = new UpdateCar(inMemoryCarsRepository);
  inMemoryCarsRepository.failTestGetByPlate = true;

  await expect(
    updateCar.execute({
      id: "1",
      plate: "ABC-1234",
      brand: "Fiat",
      color: "Branco",
    })
  ).rejects.toThrow();
});

test("should not be able to update a car with an invalid plate", async () => {
  const inMemoryCarsRepository = new InMemoryCarsRepository();
  const updateCar = new UpdateCar(inMemoryCarsRepository);

  await expect(
    updateCar.execute({
      id: "1",
      plate: "ABC-123",
      brand: "Fiat",
      color: "Branco",
    })
  ).rejects.toThrow();
});
