import httpStatus from "http-status";
import AppError from "../../../error/AppError";
import { Landlord } from "../../../models/landlord.model";
import {
  CreateLandlordDto,
  LoginLandlordDto,
  UpdateLandlordDto,
  VerifyLandlordDto,
} from "./landlord.account.dto";
import createJwtToken from "../../../utils/jwt";
import { comparePassword, hashPassword } from "../../../utils/managePassword";

const createLandLordAccountInDB = async (payload: CreateLandlordDto) => {
  const existingAccount = await Landlord.findOne({ email: payload.email });

  if (existingAccount) {
    throw new AppError(
      httpStatus.CONFLICT,
      "Already have an account with the email."
    );
  }
  payload.password = await hashPassword(payload.password);
  const newAccount = await Landlord.create(payload);

  if (!newAccount) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Failed to create account."
    );
  }

  const token = createJwtToken({
    userId: newAccount._id as string,
    email: newAccount.email,
    role: "landLord",
    verified: false,
  });
  return { token, account: newAccount, role: "landlord" };
};

const loginLandlordInSystem = async (payload: LoginLandlordDto) => {
  const existingAccount = await Landlord.findOne({ email: payload.email });

  if (!existingAccount) {
    throw new AppError(httpStatus.NOT_FOUND, "Land-lord account not found.");
  }
  const passMatch = await comparePassword(
    payload.password,
    existingAccount.password
  );

  if (!passMatch) {
    throw new AppError(httpStatus.BAD_REQUEST, "Incorrect credential.");
  }

  // hello

  const token = createJwtToken({
    userId: existingAccount._id as string,
    email: existingAccount.email,
    role: "landLord",
    verified: false,
  });
  return { token, account: existingAccount, role: "landlord" };
};

const verifyLandlordInDB = async (
  email: string,
  payload: VerifyLandlordDto
) => {
  const user = await Landlord.findOne({ email });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found.");
  }

  if (user.verified) {
    throw new AppError(httpStatus.CONFLICT, "User is already verified.");
  }
  const updatedData = { ...payload, verified: true };

  const updatedUser = await Landlord.findOneAndUpdate({ email }, updatedData, {
    new: true,
    runValidators: true,
  });

  return updatedUser;
};

const updateLandlordInDB = async (
  email: string,
  payload: UpdateLandlordDto
) => {
  const user = await Landlord.findOne({ email });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found.");
  }

  const updatedUser = await Landlord.findOneAndUpdate({ email }, payload, {
    new: true,
    runValidators: true,
  });

  return updatedUser;
};

const getLandlordAccountFromDB = async (userId: string) => {
  const user = await Landlord.findById(userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  return user;
};

export const landlordAccountServices = {
  createLandLordAccountInDB,
  loginLandlordInSystem,
  verifyLandlordInDB,
  updateLandlordInDB,
  getLandlordAccountFromDB,
};
