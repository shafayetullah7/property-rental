import httpStatus from "http-status";
import catchAsync from "../../../middlewares/catchAsync";
import { adminAccountServices } from "./admin.account.services";
import resBuild from "../../../utils/resBuild";

const createAdmin = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await adminAccountServices.createAdminInDB(payload);
  return res
    .status(httpStatus.CREATED)
    .json(resBuild(httpStatus.CREATED, "New admin created.", result));
});

const loginAdmin = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await adminAccountServices.loginAdminInDB(payload);
  return res
    .status(httpStatus.OK)
    .json(resBuild(httpStatus.OK, "admin logged in.", result));
});

const getAdmin = catchAsync(async (req, res) => {
  const { userId } = req.decoded;
  const result = await adminAccountServices.getAdminAccount(userId);
  return res
    .status(httpStatus.OK)
    .json(resBuild(httpStatus.OK, "admin retrieved.", result));
});

const updateAdmin = catchAsync(async (req, res) => {
  const { userId } = req.decoded;
  const payload = req.body;
  const result = await adminAccountServices.updateAdminInDB(userId, payload);
  return res
    .status(httpStatus.OK)
    .json(resBuild(httpStatus.OK, "admin updated.", result));
});

export const adminAccountController = {
  createAdmin,
  loginAdmin,
  getAdmin,
  updateAdmin,
};
