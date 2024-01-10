import { Router } from "express";
import {
  CreateCarController,
  GetByBrandColorCarController,
  GetByIdCarController,
  RemoveCarController,
  UpdateCarController,
} from "../controllers/cars";

const carsRouter = Router();

const createCarController = new CreateCarController();
const getByIdCarController = new GetByIdCarController();
const removeCarController = new RemoveCarController();
const updateCarController = new UpdateCarController();
const getByBrandColorCarController = new GetByBrandColorCarController();

carsRouter.post("", createCarController.handle);
carsRouter.get("/id/:id", getByIdCarController.handle);
carsRouter.delete("/id/:id", removeCarController.handle);
carsRouter.put("/id/:id", updateCarController.handle);
carsRouter.get("/filter/brand-color", getByBrandColorCarController.handle);

export { carsRouter };
