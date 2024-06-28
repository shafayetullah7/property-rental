import express from "express";
import authorize from "../../../middlewares/authorize";
import validateRequest from "../../../middlewares/validateRequest";
import { openPropertyController } from "./open.property.controller";
import { openPropertyValidationSchema } from "./open.property.validation";

const openPropertyRouter = express.Router();

openPropertyRouter.get(
  "/",
  validateRequest(openPropertyValidationSchema.getPropertiesSchema),
  openPropertyController.getProperties
);

export default openPropertyRouter;
