import { Router } from "express";
import { PrismaDriversRepository } from "../repositories/prisma/PrismaDriversRepository";
import {
  CreateDriver,
  GetByIdDriver,
  GetByNameDriver,
  GetNamesCarsDriversDriver,
  RemoveDriver,
  UpdateDriver,
} from "../services/drivers";

const driversRouter = Router();
const prismaDriversRepository = new PrismaDriversRepository();

driversRouter.post("", async (request, response) => {
  const { name } = request.body;

  const create = new CreateDriver(prismaDriversRepository);

  try {
    const driver = await create.execute({ name });
    return response.status(201).json({ driver });
  } catch (error: any) {
    return response.status(400).json({ error: error.message });
  }
});

driversRouter.get("/id/:id", async (request, response) => {
  const { id } = request.params;

  const getById = new GetByIdDriver(prismaDriversRepository);

  try {
    const driver = await getById.execute(Number(id));
    return response.status(200).json({ driver });
  } catch (error: any) {
    return response.status(404).json({ error: error.message });
  }
});

driversRouter.delete("/id/:id", async (request, response) => {
  const { id } = request.params;

  const remove = new RemoveDriver(prismaDriversRepository);

  try {
    await remove.execute(Number(id));
    return response.status(200).send();
  } catch (error: any) {
    return response.status(404).json({ error: error.message });
  }
});

driversRouter.put("/id/:id", async (request, response) => {
  const { id } = request.params;
  const { name } = request.body;

  const update = new UpdateDriver(prismaDriversRepository);

  try {
    await update.execute(Number(id), name);
    return response.status(200).send();
  } catch (error: any) {
    return response.status(404).json({ error: error.message });
  }
});

driversRouter.get("/filter/name", async (request, response) => {
  const { name } = request.body;

  const getByName = new GetByNameDriver(prismaDriversRepository);

  try {
    const drivers = await getByName.execute(name);
    return response.status(200).json({ drivers });
  } catch (error: any) {
    return response.status(404).json({ error: error.message });
  }
});

driversRouter.get("/select/name-car-driver", async (request, response) => {
  const getNamesCarsDrivers = new GetNamesCarsDriversDriver(prismaDriversRepository);

  try {
    const drivers = await getNamesCarsDrivers.execute();
    return response.status(200).json({ drivers });
  } catch (error: any) {
    return response.status(404).json({ error: error.message });
  }
});

export { driversRouter };
