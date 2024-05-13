import { ErrorRequestHandler } from "express";
import httpStatus from "http-status";
import { ZodError } from "zod";
import Ierror from "../error/error.interface";

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
const globalErrorHandler: ErrorRequestHandler = async (err, req, res, next) => {
  console.log(err);
  let statusCode = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;

  const resError: Ierror = {
    success: false,
    statusCode: err.statusCode || 500,
    name: err.name || "Error",
    message: err.message || "Something went wrong",
  };

  console.log("stackkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk", err?.stack);
  // zod error modification
  if (err instanceof ZodError) {
    statusCode = httpStatus.BAD_REQUEST;
    resError.message = "Validation Error";
    console.log(err);

    resError.message = err.issues
      .map((issue) => `${issue.path[issue.path.length - 1]}: ${issue.message}`)
      .join(" | ");
  }
  // error 11000 modification
  else if (
    (statusCode && statusCode === httpStatus.UNAUTHORIZED) ||
    err.name === "JsonWebTokenError"
  ) {
    statusCode = httpStatus.UNAUTHORIZED;
    resError.message = "Unauthorized access.";
  } else if (err.name === "TokenExpiredError") {
    statusCode = httpStatus.UNAUTHORIZED;
    resError.message = "Session expired. Login again to continue.";
  }

  return res
    .status(statusCode || httpStatus.INTERNAL_SERVER_ERROR)
    .json(resError);
};

export default globalErrorHandler;
