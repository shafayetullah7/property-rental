import httpStatus from "http-status";
import AppError from "../../../error/AppError";
import catchAsync from "../../../middlewares/catchAsync";
import { userAccountServices } from "./user.account.services";
import resBuild from "../../../utils/resBuild";

const registerUserAccount = catchAsync(async (req, res) => {
  const payload = req.body;

  const result = await userAccountServices.registerNewUserInDB(payload);

  if (!result) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Failed to create new user account."
    );
  }

  return res
    .status(httpStatus.CREATED)
    .json(resBuild(httpStatus.CREATED, "New user account created.", result));
});

const loginUser = catchAsync(async (req, res) => {
  const payload = req.body;

  const result = await userAccountServices.loginUserInDB(payload);

  if (!result) {
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, "Failed to login.");
  }

  return res
    .status(httpStatus.OK)
    .json(resBuild(httpStatus.OK, "Logged in.", result));
});

const verifyUser = catchAsync(async (req, res) => {
  if (!req.decoded) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized access.");
  }
  const { userId } = req.decoded;
  const payload = req.body;

  const result = await userAccountServices.verifyUserInDB(userId, payload);

  if (!result) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Failed to verifyaccount."
    );
  }

  return res
    .status(httpStatus.OK)
    .json(resBuild(httpStatus.OK, "Account verified", result));
});

const updateUser = catchAsync(async (req, res) => {
  if (!req.decoded) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized access.");
  }
  const { userId } = req.decoded;
  const payload = req.body;

  const result = await userAccountServices.updateUserInDB(userId, payload);

  if (!result) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Failed to update account."
    );
  }

  return res
    .status(httpStatus.OK)
    .json(resBuild(httpStatus.OK, "Account updated", result));
});

const getUserAccount = catchAsync(async (req, res) => {
  if (!req.decoded) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized access.");
  }
  const { userId } = req.decoded;

  const result = await userAccountServices.getUserAccountFromDB(userId);

  return res
    .status(httpStatus.OK)
    .json(resBuild(httpStatus.OK, "Landlord account retrieved.", result));
});

export const userAccountController = {
  registerUserAccount,
  loginUser,
  verifyUser,
  updateUser,
  getUserAccount,
};
