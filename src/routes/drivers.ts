import { Router } from "express";
import {
  CreateDriverController,
  GetByIdDriverController,
  GetByNameDriverController,
  RemoveDriverController,
  UpdateDriverController,
  GetNameCarDriverDriverController,
} from "../controllers/drivers";

const driversRouter = Router();

const createDriverController = new CreateDriverController();
const getByIdDriverController = new GetByIdDriverController();
const getByNameDriverController = new GetByNameDriverController();
const removeDriverController = new RemoveDriverController();
const updateDriverController = new UpdateDriverController();
const getNameCarDriverDriverController = new GetNameCarDriverDriverController();

driversRouter.post("", createDriverController.handle);
driversRouter.get("/id/:id", getByIdDriverController.handle);
driversRouter.delete("/id/:id", removeDriverController.handle);
driversRouter.put("/id/:id", updateDriverController.handle);
driversRouter.get("/filter/name", getByNameDriverController.handle);
driversRouter.get("/select/name-car-driver", getNameCarDriverDriverController.handle);

export { driversRouter };
