import { InMemoryDriversRepository } from "../../tests/repositories/InMemoryDriversRepository";
import { UpdateDriver } from "./UpdateDriver";

test("update driver", async () => {
  const inMemoryDriversRepository = new InMemoryDriversRepository();
  const updateDriver = new UpdateDriver(inMemoryDriversRepository);
  inMemoryDriversRepository.failTestGetByFullName = true;

  await updateDriver.execute(1, "Motorista 2");

  expect(inMemoryDriversRepository.driver).toEqual(
    expect.objectContaining({
      id: 1,
      name: "Motorista 2",
    })
  );
});

test("fail to update driver with empty id", async () => {
  const inMemoryDriversRepository = new InMemoryDriversRepository();
  const updateDriver = new UpdateDriver(inMemoryDriversRepository);

  await expect(updateDriver.execute(NaN, "Motorista 2")).rejects.toEqual(
    new Error("Id não informado.")
  );
});

test("fail to update driver with empty name", async () => {
  const inMemoryDriversRepository = new InMemoryDriversRepository();
  const updateDriver = new UpdateDriver(inMemoryDriversRepository);

  await expect(updateDriver.execute(1, "")).rejects.toEqual(new Error("Nome não informado."));
});

test("fail to update driver that does not exist", async () => {
  const inMemoryDriversRepository = new InMemoryDriversRepository();
  const updateDriver = new UpdateDriver(inMemoryDriversRepository);
  inMemoryDriversRepository.failTestGetById = true;

  await expect(updateDriver.execute(1, "Motorista 2")).rejects.toEqual(
    new Error("Motorista não encontrado.")
  );
});

test("fail to update driver with name that already exists", async () => {
  const inMemoryDriversRepository = new InMemoryDriversRepository();
  const updateDriver = new UpdateDriver(inMemoryDriversRepository);

  await expect(updateDriver.execute(1, "Motorista 2")).rejects.toEqual(
    new Error("Motorista já cadastrado.")
  );
});
