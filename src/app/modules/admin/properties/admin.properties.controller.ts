import httpStatus from "http-status";
import AppError from "../../../error/AppError";
import catchAsync from "../../../middlewares/catchAsync";
import { adminPropertiesServices } from "./admin.properties.services";
import resBuild from "../../../utils/resBuild";

const getAllProperties = catchAsync(async (req, res) => {
  const { userId } = req.decoded;

  if (!userId) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized access");
  }

  const query = req.query;

  const result = await adminPropertiesServices.getPropertiesFromDB(query);

  return res
    .status(httpStatus.OK)
    .json(resBuild(httpStatus.OK, "Properties retrieved.", result));
});

const getSingleProperty = catchAsync(async (req, res) => {
  const { userId } = req.decoded;

  if (!userId) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized access");
  }

  const { propertyId } = req.params;

  console.log(propertyId);

  const result = await adminPropertiesServices.getSinglePropertyFromDB(
    propertyId
  );

  return res
    .status(httpStatus.OK)
    .json(resBuild(httpStatus.OK, "Property retrieved.", result));
});

const verifyProperty = catchAsync(async (req, res) => {
  const { userId } = req.decoded;

  if (!userId) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized access");
  }

  const { propertyId } = req.params;

  console.log(propertyId);

  const result = await adminPropertiesServices.verifyPropertyInDB(propertyId);

  return res
    .status(httpStatus.OK)
    .json(resBuild(httpStatus.OK, "Property verified.", result));
});

export const adminPropertiesController = {
  getAllProperties,
  getSingleProperty,
  verifyProperty,
};
