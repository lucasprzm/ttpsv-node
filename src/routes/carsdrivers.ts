import { Router } from "express";
import { PrismaCarsDriversRepository } from "../repositories/prisma/PrismaCarsDriversRepository";
import { CreateCarDriver, FinishedUsingCarDriver } from "../services/carsDrivers";

const carsDriversRouter = Router();

const prismaCarsDriversRepository = new PrismaCarsDriversRepository();

carsDriversRouter.post("", async (request, response) => {
  const { carId, driverId, reason } = request.body;

  const create = new CreateCarDriver(prismaCarsDriversRepository);

  try {
    const carDriver = await create.execute({ carId, driverId, reason });
    return response.status(201).json(carDriver);
  } catch (error: any) {
    return response.status(400).json({ error: error.message });
  }
});

carsDriversRouter.put("/finished/:id", async (request, response) => {
  const { id } = request.params;

  const finishedUsing = new FinishedUsingCarDriver(prismaCarsDriversRepository);

  try {
    await finishedUsing.execute(Number(id));
    return response.status(200).send();
  } catch (error: any) {
    return response.status(404).json({ error: error.message });
  }
});

export { carsDriversRouter };
