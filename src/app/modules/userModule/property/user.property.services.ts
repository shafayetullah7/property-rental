import { GetWishesQuery, UpdateWishBody } from "./user.property.dto";
import { User } from "../../../models/user.model";
import AppError from "../../../error/AppError";
import httpStatus from "http-status";
import { Wishlist } from "../../../models/wishlist.model";
import { Property } from "../../../models/property.model";
import { Schema, Types } from "mongoose";

const getPropertiesFromDB = async (userId: string) => {
  let properties = await Property.find()
    .populate({
      path: "owner",
      select:
        "name email profileImage mobileNumber whatsAppNumber officeNumber",
    })
    .lean();
  if (userId) {
    const user = await User.findById(userId);
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, "User not found.");
    }
    const wishes = await Wishlist.find({ userId }).lean();

    properties = properties.map((property) => {
      const wish = wishes.find((wish) => wish.propertyId === property._id);
      if (wish) {
        return {
          ...property,
          wishStatus: { wishListed: true, status: wish.status },
        };
      } else {
        return {
          ...property,
          wishStatus: { wishListed: false, status: undefined },
        };
      }
    });
  }
  return properties;
};

const getWishesFromDB = async (userId: string, query: GetWishesQuery) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found.");
  }

  const queryObj: any = { ...query };
  if (query.id) {
    queryObj._id = new Types.ObjectId(query.id);
    delete queryObj.id;
  }

  const wishes = await Wishlist.find({ userId, ...queryObj }).populate({
    path: "propertyId",
    select: "-_v -createdAt -updatedAt -isVerified",
    populate: {
      path: "owner",
      select:
        "name email profileImage mobileNumber whatsAppNumber officeNumber",
    },
  });

  return wishes;
};

const addToWishlistInDB = async (userId: string, propertyId: string) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found.");
  }

  const property = await Property.findById(propertyId);

  if (!property) {
    throw new AppError(httpStatus.NOT_FOUND, "Property not found.");
  }

  const existingWish = await Wishlist.findOne({ userId, propertyId });
  if (existingWish) {
    throw new AppError(httpStatus.CONFLICT, "Already added to wishlist.");
  } else {
    const wish = await Wishlist.create({ userId, propertyId });
    return wish;
  }
};

const removeFromWishlistInDB = async (userId: string, propertyId: string) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found.");
  }

  const property = await Property.findById(propertyId);

  if (!property) {
    throw new AppError(httpStatus.NOT_FOUND, "Property not found.");
  }

  const existingWish = await Wishlist.findOne({ userId, propertyId });
  if (!existingWish) {
    throw new AppError(
      httpStatus.CONFLICT,
      "Property do not exists on wishlist."
    );
  } else {
    const deleted = await Wishlist.deleteOne({ userId, propertyId });
    return deleted;
  }
};

const toggleWishInDB = async (userId: string, propertyId: string) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found.");
  }

  const property = await Property.findById(propertyId);

  if (!property) {
    throw new AppError(httpStatus.NOT_FOUND, "Property not found.");
  }

  const existingWish = await Wishlist.findOne({ userId, propertyId });
  if (existingWish) {
    const deleted = await Wishlist.deleteOne({ userId, propertyId });
    return deleted;
  } else {
    const wish = await Wishlist.create({ userId, propertyId });
    return wish;
  }
};

const updateWishScheduleInDB = async (
  userId: string,
  wishId: string,
  payload: UpdateWishBody
) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found.");
  }

  const wish = await Wishlist.findById(wishId);
  if (!wish || wish.userId.toString() !== userId) {
    throw new AppError(httpStatus.NOT_FOUND, "Wish not found.");
  }

  if (!Object.keys(payload).length) {
    throw new AppError(httpStatus.BAD_REQUEST, "No data provided to update.");
  }
  const newPayload = { ...payload, meetingApproval: "pending" };
  // const result = await Wishlist.findOneAndUpdate(
  //   { id: new Types.ObjectId(wishId) },
  //   newPayload,
  //   {
  //     new: true,
  //   }
  // );
  const result = await Wishlist.findOneAndUpdate(
    { _id: new Types.ObjectId(wishId) },
    newPayload,
    {
      new: true,
    }
  );
  return result;
};

export const userPropertyServices = {
  getPropertiesFromDB,
  getWishesFromDB,
  addToWishlistInDB,
  removeFromWishlistInDB,
  toggleWishInDB,
  updateWishScheduleInDB,
};
