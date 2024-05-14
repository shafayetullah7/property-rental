import { query } from "express";
import { Types } from "mongoose";
import { z } from "zod";

const createPropertyData = z.object({
  propertyName: z.string(),
  propertyPrice: z.number(),
  propertyUploadingDate: z.string().datetime(),
  lastStatusUpdatingDate: z.string().datetime(),
  propertyStatus: z.enum(["Available", "Rented"]),
  propertyType: z.enum(["Flat", "House"]),
  propertyID: z.string(),
  bedrooms: z.number().min(0),
  bathrooms: z.number().min(0),
  area: z.number(),
  propertyBio: z.string(),
  propertyVideo: z.string(),
  propertyLocation: z.object({
    longitude: z.number().min(-180).max(180),
    latitude: z.number().min(-90).max(90),
  }),
  propertyImages: z.array(z.string()).min(10),
  propertyDocuments: z.string(),
});

const updatePropertyData = z
  .object({
    propertyName: z.string(),
    propertyPrice: z.number(),
    propertyUploadingDate: z.string().datetime(),
    lastStatusUpdatingDate: z.string().datetime(),
    propertyStatus: z.enum(["Available", "Rented"]),
    propertyType: z.enum(["Flat", "House"]),
    propertyID: z.string(),
    bedrooms: z.number().min(0),
    bathrooms: z.number().min(0),
    area: z.number(),
    propertyBio: z.string(),
    propertyVideo: z.string(),
    propertyLocation: z.object({
      longitude: z.number().min(-180).max(180),
      latitude: z.number().min(-90).max(90),
    }),
    propertyImages: z.array(z.string()).min(10),
    propertyDocuments: z.string(),
  })
  .partial();

const getPropertyQuery = z
  .object({
    propertyType: z.enum(["Flat", "House"]).optional(),
    propertyStatus: z.enum(["Available", "Rented"]).optional(),
    minPrice: z.number().min(0).optional(),
    maxPrice: z.number().min(0).optional(),
    _id: z.string().uuid().optional(),
    sortBy: z
      .enum([
        "propertyPrice",
        "bedrooms",
        "bathrooms",
        "area",
        "createdAt",
        "updatedAt",
      ])
      .optional(), // Field to sort by
    sortOrder: z.enum(["asc", "desc"]).optional(), // Sorting order
  })
  .partial();

const getPropertyQuerySchema = z.object({
  query: getPropertyQuery,
});

const createPropertySchema = z.object({
  body: createPropertyData,
});

const updatePropertySchema = z.object({
  body: updatePropertyData,
});

export const landLordPropertyDtoSchema = {
  createPropertyData,
  updatePropertyData,
  getPropertyQuery,
};

export const landlordPropertyValidation = {
  createPropertySchema,
  updatePropertySchema,
  getPropertyQuerySchema,
};
