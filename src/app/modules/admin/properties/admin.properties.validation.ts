import { z } from "zod";

const getAllPropertyQuery = z
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
    owner: z.string(),
  })
  .partial();

const getAllPropertyQuerySchema = z.object({
  query: getAllPropertyQuery,
});

export const AdminPropertiesDtoSchema = {
  getAllPropertyQuery,
};

export const adminPropertiesValidation = {
  getAllPropertyQuerySchema,
};
