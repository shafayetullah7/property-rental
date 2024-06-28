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

const getSingleLandlordProperties = catchAsync(async (req, res) => {
  const { userId } = req.decoded;
  const { id } = req.params;

  if (!userId) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized access");
  }

  const result =
    await landlordPropertyServices.geSingletLandLordPropertiesFromDB(
      userId,
      id
    );

  console.log(result);

  return res
    .status(httpStatus.OK)
    .json(resBuild(httpStatus.OK, "Property retrieved.", result));
});

const updateLandlordProperties = catchAsync(async (req, res) => {
  const { userId } = req.decoded;

  if (!userId) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized access");
  }

  const payload = req.body;
  const { propertyId } = req.params;

  // console.log(req.params);
  // console.log("propertyId", propertyId);

  const result = await landlordPropertyServices.updateLandlordPropertyInDB(
    userId,
    propertyId,
    payload
  );
  // console.log("result", result);

  if (!result) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Failed to update property."
    );
  }

  return res
    .status(httpStatus.OK)
    .json(resBuild(httpStatus.OK, "Property updated.", result));
});

const approveMeeting = catchAsync(async (req, res) => {
  const { userId } = req.decoded;

  if (!userId) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized access");
  }

  const payload = req.body;
  const { wishId } = req.params;

  const result = await landlordPropertyServices.approveScheduleFromDB(
    userId,
    wishId,
    payload
  );

  if (!result) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Failed to update property."
    );
  }

  return res
    .status(httpStatus.OK)
    .json(resBuild(httpStatus.OK, "Property updated.", result));
});

const approveRent = catchAsync(async (req, res) => {
  const { userId } = req.decoded;

  if (!userId) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized access");
  }

  const payload = req.body;
  const { wishId } = req.params;

  const result = await landlordPropertyServices.approveRentFromDB(
    userId,
    wishId,
    payload
  );

  if (!result) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Failed to update property."
    );
  }

  return res
    .status(httpStatus.OK)
    .json(resBuild(httpStatus.OK, "Property rented.", result));
});

export const landlordPropertyController = {
  createLandlordProperty,
  getLandlordProperties,
  updateLandlordProperties,
  getSingleLandlordProperties,
  approveMeeting,
  approveRent
};
