import express from "express";
import authorize from "../../../middlewares/authorize";
import validateRequest from "../../../middlewares/validateRequest";
import { userPropertyValidationSchema } from "./user.property.validation";
import { userPropertyController } from "./user.property.controller";

const userPropertyRouter = express.Router();

userPropertyRouter.get(
  "/",
  authorize("user"),
  validateRequest(userPropertyValidationSchema.getPropertiesSchema),
  userPropertyController.getProperties
);

userPropertyRouter.get(
  "/wishlist",
  authorize("user"),
  validateRequest(userPropertyValidationSchema.getWishesSchema),
  userPropertyController.getWishlist
);

userPropertyRouter.post(
  "/wishlist",
  authorize("user"),
  validateRequest(userPropertyValidationSchema.addToWishlistSchema),
  userPropertyController.addToWishlist
);

userPropertyRouter.delete(
  "/wishlist/:propertyId",
  authorize("user"),
  validateRequest(userPropertyValidationSchema.deleteFromWishlistSchema),
  userPropertyController.removeFromWishlist
);

userPropertyRouter.patch(
  "/wishlist/schedule/:wishId",
  authorize("user"),
  validateRequest(userPropertyValidationSchema.updateWishlistScheduleSchema),
  userPropertyController.updateWishSchedule
);

export default userPropertyRouter;
