import { query } from "express";
import { z } from "zod";

const createPropertyData = z.object({
  propertyName: z.string(),
  propertyPrice: z.number(),
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
  locationUrl: z.string(),
  propertyImages: z.array(z.string()).min(10),
  propertyDocuments: z.string(),
});

const updatePropertyData = z
  .object({
    propertyName: z.string(),
    propertyPrice: z.number(),
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
    locationUrl: z.string(),

    propertyImages: z.array(z.string()).min(10),
    propertyDocuments: z.string(),
  })
  .partial();

const getPropertyQuery = z
  .object({
    propertyType: z.enum(["Flat", "House"]),
    propertyStatus: z.enum(["Available", "Rented"]),
    minPrice: z
      .string()
      .transform((val) => Number(val) || 0)
      .refine((val) => val >= 0, "minimum price cannot be less than 0."),
    maxPrice: z
      .string()
      .transform((val) => Number(val) || 0)
      .refine((val) => val >= 0, "maximum price cannot be less than 0."),
    _id: z.string(),
    sortBy: z.enum([
      "propertyPrice",
      "bedrooms",
      "bathrooms",
      "area",
      "createdAt",
      "updatedAt",
    ]), // Field to sort by
    sortOrder: z.enum(["asc", "desc"]), // Sorting order
    isVerified: z.enum(["true", "false"]).transform((val) => {
      if (val === "true") return true;
      else if (val === "false") return false;
    }),
  })
  .partial();

const meetingApprovalData = z.object({
  meetingApproval: z.enum(["accepted", "rejected", "pending"]),
});

const rentApprovalData = z.object({
  status: z.enum(["accepted", "rejected"]),
});

const getPropertyQuerySchema = z.object({
  query: getPropertyQuery,
});

const createPropertySchema = z.object({
  body: createPropertyData,
});

const updatePropertySchema = z.object({
  body: updatePropertyData,
  params: z.object({
    propertyId: z.string(),
  }),
});

const approveScheduleSchema = z.object({
  body: meetingApprovalData,
  params: z.object({
    wishId: z.string(),
  }),
});

const approveRentSchema = z.object({
  body: rentApprovalData,
  params: z.object({
    wishId: z.string(),
  }),
});

const getSinglePropertySchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});

export const landLordPropertyDtoSchema = {
  createPropertyData,
  updatePropertyData,
  getPropertyQuery,
  meetingApprovalData,
  rentApprovalData,
};

export const landlordPropertyValidation = {
  createPropertySchema,
  updatePropertySchema,
  getPropertyQuerySchema,
  getSinglePropertySchema,
  approveScheduleSchema,
  approveRentSchema,
};
