import httpStatus from "http-status";
import AppError from "../../../error/AppError";
import { Landlord } from "../../../models/landlord.model";
import { CreateLandlordDto } from "../account/landlord.account.dto";
import { Property } from "../../../models/property.model";

const createLandlordPropertyInDB = async (
  userId: string,
  payload: CreateLandlordDto
) => {
  const user = await Landlord.findById(userId);
  if (!userId) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found.");
  }

  const newProperty = await Property.create(payload);

  return newProperty;
};
