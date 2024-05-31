import express from "express";
import authorize from "../../../middlewares/authorize";
import { adminPropertiesController } from "./admin.properties.controller";
import validateRequest from "../../../middlewares/validateRequest";
import { adminPropertiesValidation } from "./admin.properties.validation";

const adminPropertiesRouter = express.Router();

adminPropertiesRouter.get(
  "/",
  authorize("admin"),
  validateRequest(adminPropertiesValidation.getAllPropertyQuerySchema),
  adminPropertiesController.getAllProperties
);

adminPropertiesRouter.get(
  "/:propertyId",
  authorize("admin"),
  adminPropertiesController.getSingleProperty
);

adminPropertiesRouter.patch(
  "/:propertyId/verify",
  authorize("admin"),
  adminPropertiesController.verifyProperty
);

export default adminPropertiesRouter;
