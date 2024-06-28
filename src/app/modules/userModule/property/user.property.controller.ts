import httpStatus from "http-status";
import AppError from "../../../error/AppError";
import catchAsync from "../../../middlewares/catchAsync";
import { userPropertyServices } from "./user.property.services";
import resBuild from "../../../utils/resBuild";

const getProperties = catchAsync(async (req, res) => {
  if (!req.decoded) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized access.");
  }
  const { userId } = req.decoded;
  const payload = req.body;

  const result = await userPropertyServices.getPropertiesFromDB(userId);

  return res
    .status(httpStatus.OK)
    .json(resBuild(httpStatus.OK, "Properties retrieved.", result));
});

const getWishlist = catchAsync(async (req, res) => {
  if (!req.decoded) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized access.");
  }
  const { userId } = req.decoded;
  const query = req.query;

  const result = await userPropertyServices.getWishesFromDB(userId, query);

  return res
    .status(httpStatus.OK)
    .json(resBuild(httpStatus.OK, "Wishlist retrieved.", result));
});

const addToWishlist = catchAsync(async (req, res) => {
  if (!req.decoded) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized access.");
  }
  const { userId } = req.decoded;
  const { propertyId } = req.body;

  console.log(req.body);

  if (!propertyId) {
    throw new AppError(httpStatus.BAD_REQUEST, "Property ID is required.");
  }

  const result = await userPropertyServices.addToWishlistInDB(
    userId,
    propertyId
  );

  return res
    .status(httpStatus.OK)
    .json(resBuild(httpStatus.OK, "Added to wishlist.", result));
});

const removeFromWishlist = catchAsync(async (req, res) => {
  if (!req.decoded) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized access.");
  }
  const { userId } = req.decoded;
  const { propertyId } = req.params;

  if (!propertyId) {
    throw new AppError(httpStatus.BAD_REQUEST, "Property ID is required.");
  }

  const result = await userPropertyServices.removeFromWishlistInDB(
    userId,
    propertyId
  );

  return res
    .status(httpStatus.OK)
    .json(resBuild(httpStatus.OK, "Removed from wishlist.", result));
});

const updateWishSchedule = catchAsync(async (req, res) => {
  if (!req.decoded) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized access.");
  }
  const { userId } = req.decoded;
  const { wishId } = req.params;

  const payload = req.body;

  const result = await userPropertyServices.updateWishScheduleInDB(
    userId,
    wishId,
    payload
  );

  return res
    .status(httpStatus.OK)
    .json(resBuild(httpStatus.OK, "Wish scheduled.", result));
});

export const userPropertyController = {
  getProperties,
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  updateWishSchedule,
};
