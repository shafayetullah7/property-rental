import httpStatus from "http-status";
import AppError from "../../../error/AppError";
import {
  LoginUserDto,
  RegisterUserDto,
  UpdateUserDto,
  VerifyUserDto,
} from "./user.account.dto";
import createJwtToken from "../../../utils/jwt";
import { comparePassword, hashPassword } from "../../../utils/managePassword";
import { User } from "../../../models/user.model";

const registerNewUserInDB = async (payload: RegisterUserDto) => {
  const { email } = payload;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new AppError(
      httpStatus.CONFLICT,
      "Already exists user with this email."
    );
  }

  payload.password = await hashPassword(payload.password);
  const newUser = await User.create(payload);

  const token = createJwtToken({
    userId: newUser._id.toString(),
    email: newUser.email,
    role: "user",
    verified: newUser.verified,
  });

  return { token, user: newUser, role: "user" };
};

const loginUserInDB = async (payload: LoginUserDto) => {
  const { email } = payload;
  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found.");
  }

  console.log(payload.password, user.password);
  const passMatch = await comparePassword(payload.password, user.password);

  if (!passMatch) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid credential.");
  }

  const token = createJwtToken({
    userId: user._id.toString(),
    email: user.email,
    role: "user",
    verified: user.verified,
  });

  return { token, user, role: "user" };
};

const verifyUserInDB = async (id: string, payload: VerifyUserDto) => {
  const user = await User.findById(id);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found.");
  }

  if (user.verified) {
    throw new AppError(httpStatus.CONFLICT, "User is already verified.");
  }

  const updatedData = { ...payload, verified: true };

  const updatedUser = await User.findByIdAndUpdate(id, updatedData, {
    new: true,
    runValidators: true,
  });

  return updatedUser;
};

const updateUserInDB = async (id: string, payload: UpdateUserDto) => {
  const user = await User.findById(id);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found.");
  }

  if (!Object.keys(payload).length) {
    throw new AppError(httpStatus.BAD_REQUEST, "No data provided to update.");
  }

  if (payload.password) {
    payload.password = await hashPassword(payload.password);
  }

  const updatedUser = await User.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return updatedUser;
};

const getUserAccountFromDB = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  return user;
};

export const userAccountServices = {
  registerNewUserInDB,
  loginUserInDB,
  verifyUserInDB,
  updateUserInDB,
  getUserAccountFromDB,
};
