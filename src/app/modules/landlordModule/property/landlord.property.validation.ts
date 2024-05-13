import { z } from "zod";

const createPropertyData = z.object({
  propertyImages: z.array(z.string()).min(10),
  propertyName: z.string(),
  propertyPrice: z.number(),
  propertyUploadingDate: z.date(),
  lastStatusUpdatingDate: z.date(),
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
  propertyDocuments: z.string(),
});

const updatePropertyData = z
  .object({
    propertyImages: z.array(z.string()).min(10),
    propertyName: z.string(),
    propertyPrice: z.number(),
    propertyUploadingDate: z.date(),
    lastStatusUpdatingDate: z.date(),
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
    propertyDocuments: z.string(),
  })
  .partial();

const createPropertySchema = {
  body: createPropertyData,
};

const updatePropertySchema = {
  body: updatePropertyData,
};

export const landLordPropertyDtoSchema = {
  createPropertyData,
  updatePropertyData,
};

export const landlordPropertyValidation = {
  createPropertySchema,
  updatePropertySchema,
};
