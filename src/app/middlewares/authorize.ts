import jwt from "jsonwebtoken";
import config from "../config";
import catchAsync from "./catchAsync";
import AppError from "../error/AppError";
import httpStatus from "http-status";
import { TuserRole } from "../constants";
import { CustomJwtPayload } from "../utils/jwt";

const authorize = (...roles: TuserRole[]) => {
  return catchAsync(async (req, res, next) => {
    const token =
      req.headers.authorization?.split(" ")[1] || (req.query.token as string);

    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized access");
    }
    const decoded = jwt.verify(
      token,
      config.jwtSecret as string
    ) as CustomJwtPayload;

    console.log(decoded.userId);
    // Attach user information to the request object
    console.log(decoded);
    req.decoded = decoded;

    const { role } = decoded;

    if (!roles.includes(role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "You do not have the necessary permissions to access this resource."
      );
    }

    req.decoded = decoded;
    next();
  });
};

export default authorize;
