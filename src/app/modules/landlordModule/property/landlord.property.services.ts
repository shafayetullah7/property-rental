import httpStatus from "http-status";
import AppError from "../../../error/AppError";
import { Landlord } from "../../../models/landlord.model";
import { Property } from "../../../models/property.model";
import {
  CreatePropertyDto,
  GetPropertyQueryDto,
  MeetingApprovalDto,
  RentApprovalDto,
} from "./landlord.property.dto";
import { Schema, Types } from "mongoose";
import { UpdateLandlordDto } from "../account/landlord.account.dto";
import { Wishlist } from "../../../models/wishlist.model";

const createLandlordPropertyInDB = async (
  userId: string,
  payload: CreatePropertyDto
) => {
  const user = await Landlord.findById(userId);
  console.log(userId, user);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found.");
  }

  console.log(payload);
  const newProperty = await Property.create({
    ...payload,
    owner: user._id,
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

const geSingletLandLordPropertiesFromDB = async (
  userId: string,
  id: string
) => {
  const user = await Landlord.findById(userId);
  if (!userId) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found.");
  }

  // Perform the query
  let property = await Property.find({
    _id: new Types.ObjectId(id),
    owner: new Types.ObjectId(userId),
  });
  const wishes = await Wishlist.find({
    propertyId: new Types.ObjectId(id),
  }).populate({
    path: "userId",
    select: "name email nid image phone whatsapp nationality",
  });
  return {
    property,
    wishes,
  };
};

const approveScheduleFromDB = async (
  userId: string,
  id: string,
  payload: MeetingApprovalDto
) => {
  const user = await Landlord.findById(userId);
  if (!userId) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found.");
  }

  const wish = await Wishlist.findById(id).populate({
    path: "propertyId",
    select: "owner",
  });

  if (!wish) {
    throw new AppError(httpStatus.NOT_FOUND, "Wish not found.");
  }

  const property = await Property.findById(wish.propertyId.toString());

  if (!property || property.owner.toString() !== userId) {
    throw new AppError(httpStatus.NOT_FOUND, "Property not found.");
  }

  if (!wish.meetingDate) {
    throw new AppError(httpStatus.BAD_REQUEST, "Meeting schedule not set yet.");
  }

  if (
    wish?.meetingApproval === "accepted" ||
    wish?.meetingApproval === "rejected"
  ) {
    throw new AppError(httpStatus.CONFLICT, `Already ${wish.meetingApproval}`);
  }

  const result = await Wishlist.findByIdAndUpdate(id, payload, { new: true });

  return result;
};

const approveRentFromDB = async (
  userId: string,
  id: string,
  payload: RentApprovalDto
) => {
  const user = await Landlord.findById(userId);
  if (!userId) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found.");
  }

  const wish = await Wishlist.findById(id);

  if (!wish) {
    throw new AppError(httpStatus.NOT_FOUND, "Wish not found.");
  }

  console.log("*******************************************");
  console.log(wish.propertyId.toString());

  const property = await Property.findById(wish.propertyId.toString());
  if (!property || property.owner.toString() !== userId) {
    throw new AppError(httpStatus.NOT_FOUND, "Property not found.");
  }

  if (property.propertyStatus === "Rented") {
    throw new AppError(httpStatus.CONFLICT, "Already rented.");
  }
  if (payload.status === "accepted") {
    wish.status = payload.status;
    property.propertyStatus = "Rented";
    await wish.save();
    await property.save();
  } else {
    wish.status = payload.status;
    await wish.save();
  }

  return { wish, property };
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
  geSingletLandLordPropertiesFromDB,
  approveScheduleFromDB,
  approveRentFromDB,
};
