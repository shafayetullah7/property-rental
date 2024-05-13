import httpStatus from "http-status";
import AppError from "../error/AppError";
import catchAsync from "./catchAsync";
import { Landlord } from "../models/landlord.model";

const verifiedOnly = catchAsync(async (req, res, next) => {
  if (!req.decoded) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized access.");
  }
  const { email, role } = req.decoded;

  if (role === "landLord") {
    const user = await Landlord.findOne({ email });

    if (!user?.verified) {
      throw new AppError(httpStatus.FORBIDDEN, "Landlord is not verified.");
    }
    return next();
  }
  throw new AppError(httpStatus.FORBIDDEN, "User is not verified.");
});

export default verifiedOnly;
