import httpStatus from "http-status";
import AppError from "../../../error/AppError";
import catchAsync from "../../../middlewares/catchAsync";
import resBuild from "../../../utils/resBuild";
import { openPropertyServices } from "./open.property.services";

const getProperties = catchAsync(async (req, res) => {
  const query = req.query;

  const result = await openPropertyServices.getPropertiesFromDB(query);

  return res
    .status(httpStatus.OK)
    .json(resBuild(httpStatus.OK, "Properties retrieved.", result));
});

export const openPropertyController = {
  getProperties,
};
