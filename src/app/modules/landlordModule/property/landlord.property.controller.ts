import httpStatus from "http-status";
import AppError from "../../../error/AppError";
import catchAsync from "../../../middlewares/catchAsync";
import { landlordPropertyServices } from "./landlord.property.services";
import resBuild from "../../../utils/resBuild";

const createLandlordProperty = catchAsync(async (req, res) => {
  const { userId } = req.decoded;

  if (!userId) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized access");
  }

  const payload = req.body;

  const result = await landlordPropertyServices.createLandlordPropertyInDB(
    userId,
    payload
  );

  if (!result) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Failed to create property."
    );
  }

  return res
    .status(httpStatus.CREATED)
    .json(resBuild(httpStatus.CREATED, "Property created.", result));
});

const getLandlordProperties = catchAsync(async (req, res) => {
  const { userId } = req.decoded;

  if (!userId) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized access");
  }

  const query = req.query;

  const result = await landlordPropertyServices.getLandLordPropertiesFromDB(
    userId,
    query
  );

  return res
    .status(httpStatus.OK)
    .json(resBuild(httpStatus.OK, "Property retrieved.", result));
});

export const landlordPropertyController = {
  createLandlordProperty,
  getLandlordProperties,
};
