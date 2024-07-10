import httpStatus from "http-status";
import AppError from "../../../error/AppError";
import { Admin } from "../../../models/admin.model";
import {
  CreateAdminDto,
  LoginAdminDto,
  UpdateAdminDto,
} from "./admin.account.dto";
import { comparePassword, hashPassword } from "../../../utils/managePassword";
import createJwtToken from "../../../utils/jwt";

const createAdminInDB = async (payload: CreateAdminDto) => {
  const { email } = payload;

  const existingAdmin = await Admin.findOne({ email });

  if (existingAdmin) {
    throw new AppError(
      httpStatus.CONFLICT,
      "User already exists with this email."
    );
  }

  payload.password = await hashPassword(payload.password);
  const admin = await Admin.create(payload);

  const token = createJwtToken({
    userId: admin._id as string, 
    email: admin.email,
    role: "admin",
    verified: true,
  });

  if (!admin || !token) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Failed to create admin."
    );
  }
  return { token, account: admin, role: "admin" };
};

const loginAdminInDB = async (payload: LoginAdminDto) => {
  const { email, password } = payload;

  const admin = await Admin.findOne({ email });

  if (!admin) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found.");
  }

  const passMatch = await comparePassword(password, admin.password);

  if (!passMatch) {
    throw new AppError(httpStatus.BAD_REQUEST, "Incorrect credential.");
  }

  const token = createJwtToken({
    userId: admin._id as string,
    email: admin.email,
    role: "admin",
    verified: true,
  });

  if (!admin || !token) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Failed to login admin."
    );
  }
  return { token, account: admin, role: "admin" };
};

const getAdminAccount = async (userId: string) => {
  const admin = await Admin.findById(userId);
  if (!admin) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found.");
  }

  return admin;
};

const updateAdminInDB = async (userId: string, payload: UpdateAdminDto) => {
  const admin = await Admin.findById(userId);
  if (!admin) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found.");
  }

  const updatedAdmin = await Admin.findByIdAndUpdate(userId, payload, {
    new: true,
  });

  if (!updatedAdmin) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Failed to update admin."
    );
  }

  return updatedAdmin;
};

export const adminAccountServices = {
  createAdminInDB,
  loginAdminInDB,
  getAdminAccount,
  updateAdminInDB,
};
