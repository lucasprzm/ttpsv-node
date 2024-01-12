import { Router } from "express";
import { PrismaCarsRepository } from "../repositories/prisma/PrismaCarsRepository";
import { CreateCar, UpdateCar, GetByIdCar, GetByBrandColor, RemoveCar } from "../services/cars";

const carsRouter = Router();
const prismaCarsRepository = new PrismaCarsRepository();

carsRouter.post("", async (request, response) => {
  const { plate, brand, color } = request.body;

  const create = new CreateCar(prismaCarsRepository);

  try {
    const car = await create.execute({ plate, brand, color });
    return response.status(201).json({ car });
  } catch (error: any) {
    return response.status(400).json({ error: error.message });
  }
});

carsRouter.get("/id/:id", async (request, response) => {
  const { id } = request.params;

  const getById = new GetByIdCar(prismaCarsRepository);

  try {
    const car = await getById.execute(Number(id));
    return response.status(200).json({ car });
  } catch (error: any) {
    return response.status(404).json({ error: error.message });
  }
});

carsRouter.delete("/id/:id", async (request, response) => {
  const { id } = request.params;

  const remove = new RemoveCar(prismaCarsRepository);

  try {
    await remove.execute(Number(id));
    return response.status(200).send();
  } catch (error: any) {
    return response.status(404).json({ error: error.message });
  }
});

carsRouter.put("/id/:id", async (request, response) => {
  let { id } = request.params;
  const { plate, brand, color } = request.body;

  const update = new UpdateCar(prismaCarsRepository);

  try {
    await update.execute({ id, plate, brand, color });
    return response.status(200).send();
  } catch (error: any) {
    return response.status(404).json({ error: error.message });
  }
});

carsRouter.get("/filter/brand-color", async (request, response) => {
  const { brand, color } = request.body;

  const getByBrandColor = new GetByBrandColor(prismaCarsRepository);

  try {
    const cars = await getByBrandColor.execute(brand, color);
    return response.status(200).json({ cars });
  } catch (error: any) {
    return response.status(404).json({ error: error.message });
  }
});

export { carsRouter };
