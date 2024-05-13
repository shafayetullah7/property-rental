import httpStatus from "http-status";
import AppError from "../../../error/AppError";
import catchAsync from "../../../middlewares/catchAsync";
import { landlordAccountServices } from "./landlord.account.services";
import resBuild from "../../../utils/resBuild";

const createLandLordAccount = catchAsync(async (req, res) => {
  const payload = req.body;

  const result = await landlordAccountServices.createLandLordAccountInDB(
    payload
  );

  if (!result) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Failed to create new landlord account."
    );
  }

  return res
    .status(httpStatus.CREATED)
    .json(
      resBuild(httpStatus.CREATED, "New landlord account created.", result)
    );
});

const loginLandLordAccount = catchAsync(async (req, res) => {
  const payload = req.body;

  const result = await landlordAccountServices.loginLandlordInSystem(payload);

  if (!result) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Failed to login into landlord account."
    );
  }

  return res
    .status(httpStatus.OK)
    .json(resBuild(httpStatus.OK, "Logged in.", result));
});

const verifyLandlord = catchAsync(async (req, res) => {
  if (!req.decoded) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized access.");
  }
  const { email } = req.decoded;
  const payload = req.body;

  const result = await landlordAccountServices.verifyLandlordInDB(
    email,
    payload
  );

  if (!result) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Failed to verify landlord account."
    );
  }

  return res
    .status(httpStatus.OK)
    .json(resBuild(httpStatus.OK, "Land lord account verified", result));
});

const updateLandlord = catchAsync(async (req, res) => {
  if (!req.decoded) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized access.");
  }
  const { email } = req.decoded;
  const payload = req.body;

  const result = await landlordAccountServices.updateLandlordInDB(
    email,
    payload
  );

  if (!result) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Failed to update landlord account."
    );
  }

  return res
    .status(httpStatus.OK)
    .json(resBuild(httpStatus.OK, "Land lord account updated", result));
});

export const landlordAccountController = {
  createLandLordAccount,
  loginLandLordAccount,
  verifyLandlord,
  updateLandlord,
};
