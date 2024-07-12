import { GetPropertiesQuery } from "./open.property.dto";
import { User } from "../../../models/user.model";
import AppError from "../../../error/AppError";
import httpStatus from "http-status";
import { Wishlist } from "../../../models/wishlist.model";
import { Property } from "../../../models/property.model";
import { Schema, Types } from "mongoose";

const getPropertiesFromDB = async (query: GetPropertiesQuery) => {
  const queryObj: any = { ...query };
  if (queryObj.propertyName) {
    queryObj.propertyName = new RegExp(queryObj.propertyName, "i");
  }
  let properties = await Property.find(queryObj).populate({
    path: "owner",
    select: "name email profileImage mobileNumber whatsAppNumber officeNumber",
  });
  return properties;
};

export const openPropertyServices = {
  getPropertiesFromDB,
};
