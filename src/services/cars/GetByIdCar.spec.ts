import { InMemoryCarsRepository } from "../../tests/repositories/InMemoryCarsRepository";
import { CreateCar } from "./CreateCar";
import { GetByIdCar } from "./GetByIdCar";

test("get a car by Id", async () => {
  const inMemoryCarsRepository = new InMemoryCarsRepository();
  const getByIdCar = new GetByIdCar(inMemoryCarsRepository);

  await expect(getByIdCar.execute(1)).resolves.not.toThrow();
  expect(inMemoryCarsRepository.car).toEqual(
    expect.objectContaining({
      plate: "ABC-1234",
      brand: "Fiat",
      color: "Branco",
    })
  );
});
