import { Router } from "express";
import {
  CreateCarDriverController,
  FinishedUsingCarDriverController,
} from "../controllers/carsdrivers";

const carsDriversRouter = Router();

const createCarDriverController = new CreateCarDriverController();
const finishedUsingCarDriverController = new FinishedUsingCarDriverController();

carsDriversRouter.post("", createCarDriverController.handle);
carsDriversRouter.put("/finished/:id", finishedUsingCarDriverController.handle);

export { carsDriversRouter };
