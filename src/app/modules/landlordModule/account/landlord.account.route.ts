import express from "express";
import validateRequest from "../../../middlewares/validateRequest";
import { landlordAccountValidation } from "./landlord.account.validation";
import { landlordAccountController } from "./landlord.account.controller";
import authorize from "../../../middlewares/authorize";
import verifiedOnly from "../../../middlewares/verifiedOnly";

const landlordAccountRouter = express.Router();

landlordAccountRouter.post(
  "/create",
  validateRequest(landlordAccountValidation.createLandlordSchema),
  landlordAccountController.createLandLordAccount
);

landlordAccountRouter.post(
  "/login",
  validateRequest(landlordAccountValidation.loginLandlordSchema),
  landlordAccountController.loginLandLordAccount
);

landlordAccountRouter.patch(
  "/verify",
  authorize("landLord"),
  validateRequest(landlordAccountValidation.verifyLandlordSchema),
  landlordAccountController.verifyLandlord
);

landlordAccountRouter.patch(
  "/update",
  authorize("landLord"),
  verifiedOnly,
  validateRequest(landlordAccountValidation.updateLandlordSchema),
  landlordAccountController.updateLandlord
);

export default landlordAccountRouter;
