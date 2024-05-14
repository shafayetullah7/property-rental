import express from "express";
import authorize from "../../../middlewares/authorize";
import validateRequest from "../../../middlewares/validateRequest";
import { landlordPropertyValidation } from "./landlord.property.validation";
import { landlordPropertyController } from "./landlord.property.controller";
import verifiedOnly from "../../../middlewares/verifiedOnly";

const landlordPropertyRouter = express.Router();

landlordPropertyRouter.post(
  "/",
  authorize("landLord"),
  verifiedOnly,
  validateRequest(landlordPropertyValidation.createPropertySchema),
  landlordPropertyController.createLandlordProperty
);

landlordPropertyRouter.get(
  "/",
  authorize("landLord"),
  validateRequest(landlordPropertyValidation.getPropertyQuerySchema),
  landlordPropertyController.getLandlordProperties
);

export default landlordPropertyRouter;
