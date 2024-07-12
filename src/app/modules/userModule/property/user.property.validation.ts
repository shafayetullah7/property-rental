import mongoose from "mongoose";
import { z } from "zod";

const toggleWishSchema = z.object({
  params: z.object({
    propertyId: z
      .string()
      .refine((val) => mongoose.Types.ObjectId.isValid(val), {
        message: "Invalid propertyId. It must be a valid ObjectId.",
      }),
  }),
});

const getWishesQuery = z
  .object({
    id: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
      message: "Invalid id. It must be a valid ObjectId.",
    }),
  })
  .partial();
const getWishesSchema = z.object({
  query: getWishesQuery,
});

const addToWishlistBody = z
  .object({
    propertyId: z
      .string()
      .refine((val) => mongoose.Types.ObjectId.isValid(val), {
        message: "Invalid id. It must be a valid ObjectId.",
      }),
  })
  .partial();
const addToWishlistSchema = z.object({
  body: addToWishlistBody,
});

const deleteFromWishlistBody = z
  .object({
    propertyId: z
      .string()
      .refine((val) => mongoose.Types.ObjectId.isValid(val), {
        message: "Invalid id. It must be a valid ObjectId.",
      }),
  })
  .partial();
const deleteFromWishlistSchema = z.object({
  params: deleteFromWishlistBody,
});

const getProperiesQuery = z
  .object({
    id: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
      message: "Invalid id. It must be a valid ObjectId.",
    }),
    propertyName: z.string(),
  })
  .partial();
const getPropertiesSchema = z.object({
  query: getProperiesQuery,
});

const updateWishlistScheduleBody = z.object({
  meetingDate: z.string().date(),
  meetingStart: z.string().time().optional(),
  meetingEnd: z.string().time().optional(),
});

const updateWishlistScheduleSchema = z.object({
  params: z.object({
    wishId: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
      message: "Invalid id. It must be a valid ObjectId.",
    }),
  }),
  body: updateWishlistScheduleBody,
});

export const wishesDtoSchema = {
  getWishesQuery,
  getProperiesQuery,
  updateWishlistScheduleBody,
};

export const userPropertyValidationSchema = {
  getWishesSchema,
  toggleWishSchema,
  getPropertiesSchema,
  updateWishlistScheduleSchema,
  addToWishlistSchema,
  deleteFromWishlistSchema,
};
