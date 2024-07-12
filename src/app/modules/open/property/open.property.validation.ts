import mongoose from "mongoose";
import { z } from "zod";

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

export const openPropertiesDtoSchema = {
  getProperiesQuery,
};

export const openPropertyValidationSchema = {
  getPropertiesSchema,
};
