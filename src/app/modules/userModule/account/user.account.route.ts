import express from "express";
import validateRequest from "../../../middlewares/validateRequest";
import authorize from "../../../middlewares/authorize";
import verifiedOnly from "../../../middlewares/verifiedOnly";
import { userAccountValidation } from "./user.account.validation";
import { userAccountController } from "./user.account.controller";

const userAccountRouter = express.Router();

userAccountRouter.get(
  "/",
  authorize("user"),
  userAccountController.getUserAccount
);

userAccountRouter.post(
  "/create",
  validateRequest(userAccountValidation.registerUserSchema),
  userAccountController.registerUserAccount
);

userAccountRouter.post(
  "/login",
  validateRequest(userAccountValidation.loginUserSchema),
  userAccountController.loginUser
);

userAccountRouter.patch(
  "/verify",
  authorize("user"),
  validateRequest(userAccountValidation.verifyUserSchema),
  userAccountController.verifyUser
);

userAccountRouter.patch(
  "/update",
  authorize("user"),
  verifiedOnly,
  validateRequest(userAccountValidation.updateUserSchema),
  userAccountController.updateUser
);

export default userAccountRouter;
