import { GetPropertiesQuery } from "./open.property.dto";
import { User } from "../../../models/user.model";
import AppError from "../../../error/AppError";
import httpStatus from "http-status";
import { Wishlist } from "../../../models/wishlist.model";
import { Property } from "../../../models/property.model";
import { Schema, Types } from "mongoose";

const getPropertiesFromDB = async (query: GetPropertiesQuery) => {
  let properties = await Property.find(query).populate({
    path: "owner",
    select: "name email profileImage mobileNumber whatsAppNumber officeNumber",
  });
  return properties;
};

export const openPropertyServices = {
  getPropertiesFromDB,
};
