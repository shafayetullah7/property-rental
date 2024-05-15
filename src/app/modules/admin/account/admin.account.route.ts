import express from "express";
import validateRequest from "../../../middlewares/validateRequest";
import { adminAccountValidation } from "./admin.account.validation";
import { adminAccountController } from "./admin.account.controller";
import authorize from "../../../middlewares/authorize";

const adminAccountRouter = express.Router();

adminAccountRouter.post(
  "/create",
  validateRequest(adminAccountValidation.createAdminSchema),
  adminAccountController.createAdmin
);

adminAccountRouter.post(
  "/login",
  validateRequest(adminAccountValidation.loginAdminSchema),
  adminAccountController.loginAdmin
);

adminAccountRouter.get(
  "/",
  authorize("admin"),
  adminAccountController.getAdmin
);

adminAccountRouter.patch(
  "/update",
  authorize("admin"),
  validateRequest(adminAccountValidation.updateAdminSchema),
  adminAccountController.updateAdmin
);

export default adminAccountRouter;
