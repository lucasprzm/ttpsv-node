import { InMemoryCarsRepository } from "../../tests/repositories/InMemoryCarsRepository";
import { GetByBrandColor } from "./GetByBrandColor";

test("get cars by brand and color", async () => {
  const inMemoryCarsRepository = new InMemoryCarsRepository();
  const getByBrandColor = new GetByBrandColor(inMemoryCarsRepository);

  await getByBrandColor.execute("Fiat", "Branco");

  expect(inMemoryCarsRepository.cars.length).toBe(2);
  expect(inMemoryCarsRepository.cars).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        plate: "ABC-1234",
        brand: "Fiat",
        color: "Branco",
      }),
      expect.objectContaining({
        plate: "FGV-1234",
        brand: "Fiat",
        color: "Branco",
      }),
    ])
  );
});

test("get cars by brand", async () => {
  const inMemoryCarsRepository = new InMemoryCarsRepository();
  const getByBrandColor = new GetByBrandColor(inMemoryCarsRepository);

  await getByBrandColor.execute("Fiat");

  expect(inMemoryCarsRepository.cars.length).toBe(2);
  expect(inMemoryCarsRepository.cars).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        plate: "ABC-1234",
        brand: "Fiat",
        color: "Branco",
      }),
      expect.objectContaining({
        plate: "FGV-1234",
        brand: "Fiat",
        color: "Verde",
      }),
    ])
  );
});

test("get cars by color", async () => {
  const inMemoryCarsRepository = new InMemoryCarsRepository();
  const getByBrandColor = new GetByBrandColor(inMemoryCarsRepository);

  await getByBrandColor.execute(undefined, "Branco");

  expect(inMemoryCarsRepository.cars.length).toBe(2);
  expect(inMemoryCarsRepository.cars).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        plate: "ABC-1234",
        brand: "VW",
        color: "Branco",
      }),
      expect.objectContaining({
        plate: "FGV-1234",
        brand: "Fiat",
        color: "Branco",
      }),
    ])
  );
});

test("should not be able to get cars by brand and color if brand and color are not informed", async () => {
  const inMemoryCarsRepository = new InMemoryCarsRepository();
  const getByBrandColor = new GetByBrandColor(inMemoryCarsRepository);

  await expect(getByBrandColor.execute()).rejects.toThrow();
});

test("should not be able to get any car", async () => {
  const inMemoryCarsRepository = new InMemoryCarsRepository();
  const getByBrandColor = new GetByBrandColor(inMemoryCarsRepository);
  inMemoryCarsRepository.failTestGetByBrandColor = true;

  await expect(getByBrandColor.execute("Fiat", "Branco")).resolves.not.toThrow();
  expect(inMemoryCarsRepository.cars.length).toBe(0);
});
