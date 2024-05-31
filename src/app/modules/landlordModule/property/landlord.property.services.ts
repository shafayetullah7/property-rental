import httpStatus from "http-status";
import AppError from "../../../error/AppError";
import { Landlord } from "../../../models/landlord.model";
import { Property } from "../../../models/property.model";
import {
  CreatePropertyDto,
  GetPropertyQueryDto,
} from "./landlord.property.dto";
import { Schema } from "mongoose";
import { UpdateLandlordDto } from "../account/landlord.account.dto";

const createLandlordPropertyInDB = async (
  userId: string,
  payload: CreatePropertyDto
) => {
  const user = await Landlord.findById(userId);
  if (!userId) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found.");
  }

  const newProperty = await Property.create({
    ...payload,
    owner: user?.id,
  });

  return newProperty;
};

const getLandLordPropertiesFromDB = async (
  userId: string,
  query: GetPropertyQueryDto = {}
) => {
  const user = await Landlord.findById(userId);
  if (!userId) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found.");
  }

  const queryObj: any = {};

  if (query.minPrice) {
    queryObj.propertyPrice = { $gte: query.minPrice };
  }
  if (query.maxPrice) {
    queryObj.propertyPrice = {
      ...queryObj.propertyPrice,
      $lte: query.maxPrice,
    };
  }
  if (query._id) {
    queryObj._id = query._id;
  }
  if (query.isVerified) {
    queryObj.isVerified = true;
  } else if (query.isVerified) {
    queryObj.isVerified = false;
  }

  // queryObj[query.sortBy || "createdAt"] = query.sortOrder === "asc" ? 1 : -1;

  const sortBy = query.sortBy ? query.sortBy : "createdAt";
  const sortOrder = query.sortOrder === "asc" ? 1 : -1;

  queryObj.owner = userId;

  // Perform the query
  let properties = Property.find(queryObj);

  properties = properties.sort({ [sortBy]: sortOrder });
  return await properties.exec();
};

const updateLandlordPropertyInDB = async (
  userId: string,
  propertyId: string,
  payload: UpdateLandlordDto
) => {
  const user = await Landlord.findById(userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found.");
  }

  if (!Object.keys(payload).length) {
    throw new AppError(httpStatus.BAD_REQUEST, "No data provided to update.");
  }

  const property = await Property.findById(propertyId);

  // console.log(property);

  if (!property) {
    throw new AppError(httpStatus.NOT_FOUND, "Property not found.");
  }

  const result = await Property.findByIdAndUpdate(propertyId, payload, {
    new: true,
  });

  console.log(result);

  return result;
};

export const landlordPropertyServices = {
  createLandlordPropertyInDB,
  getLandLordPropertiesFromDB,
  updateLandlordPropertyInDB,
};
