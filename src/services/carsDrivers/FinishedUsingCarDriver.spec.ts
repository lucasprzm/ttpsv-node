import { InMemoryCarsDriversRepository } from "../../tests/repositories/InMemoryCarsDriversRepository";
import { FinishedUsingCarDriver } from "./FinishedUsingCarDriver";

test("finished using car driver", async () => {
  const inMemoryCarsDriversRepository = new InMemoryCarsDriversRepository();
  const finishedUsingCarDriver = new FinishedUsingCarDriver(inMemoryCarsDriversRepository);

  inMemoryCarsDriversRepository.failTestGetByIdAndFinishedUsingNotNull = true;

  await expect(finishedUsingCarDriver.execute(1)).resolves.not.toThrow();
  expect(inMemoryCarsDriversRepository.carDriver.finishedUsing).not.toBeNull();
});

test("should not finish using car driver if car driver does not exists", async () => {
  const inMemoryCarsDriversRepository = new InMemoryCarsDriversRepository();
  const finishedUsingCarDriver = new FinishedUsingCarDriver(inMemoryCarsDriversRepository);

  inMemoryCarsDriversRepository.failTestGetByIdAndFinishedUsingNull = true;

  await expect(finishedUsingCarDriver.execute(1)).rejects.toThrow(
    "Carro/motorista não encontrado."
  );
});

test("should not finish using car driver if car driver already finished", async () => {
  const inMemoryCarsDriversRepository = new InMemoryCarsDriversRepository();
  const finishedUsingCarDriver = new FinishedUsingCarDriver(inMemoryCarsDriversRepository);

  await expect(finishedUsingCarDriver.execute(1)).rejects.toThrow("Carro/motorista já finalizado.");
});
