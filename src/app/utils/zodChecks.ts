import httpStatus from "http-status";
import AppError from "../error/AppError";

export const strToNum = (val: string) => {
  const parsedNumber = Number(val);
  if (isNaN(parsedNumber)) {
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, "Expected number."); // Throw custom error
  }
  return parsedNumber;
};
