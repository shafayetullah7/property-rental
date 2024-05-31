import httpStatus from "http-status";
import AppError from "../../../error/AppError";
import { Property } from "../../../models/property.model";
import { GetAllPropertyQueryDto } from "./admin.properties.dto";

const getPropertiesFromDB = async (query: GetAllPropertyQueryDto = {}) => {
  const queryObj: any = {};

  console.log(query);

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
  if (query.owner) {
    queryObj.owner = query.owner;
  }
  if (query.isVerified) {
    queryObj.isVerified = true;
  } else if (query.isVerified) {
    queryObj.isVerified = false;
  }

  // queryObj[query.sortBy || "createdAt"] = query.sortOrder === "asc" ? 1 : -1;

  const sortBy = query.sortBy ? query.sortBy : "createdAt";
  const sortOrder = query.sortOrder === "asc" ? 1 : -1;

  // Perform the query
  console.log(queryObj);
  let properties = Property.find(queryObj);

  properties = properties.sort({ [sortBy]: sortOrder });

  const result = await properties.populate({
    path: "owner",
    select: "name email mobile profileImage",
  });
  return result;
};

const getSinglePropertyFromDB = async (propertyId: string) => {
  const property = await Property.findById(propertyId).populate({
    path: "owner",
    select: "-password -nidImage -dateOfBirth",
  });
  return property;
};

const verifyPropertyInDB = async (propertyId: string) => {
  const property = await Property.findById(propertyId);

  if (!property) {
    throw new AppError(httpStatus.NOT_FOUND, "Property not found.");
  }

  if (property.isVerified) {
    throw new AppError(httpStatus.CONFLICT, "Property is already verified.");
  }

  property.isVerified = true;

  await property.save();

  return property;
};

export const adminPropertiesServices = {
  getPropertiesFromDB,
  getSinglePropertyFromDB,
  verifyPropertyInDB,
};
