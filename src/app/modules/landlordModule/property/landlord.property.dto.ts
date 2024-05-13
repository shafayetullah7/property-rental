import { z } from "zod";
import { landLordPropertyDtoSchema } from "./landlord.property.validation";

export type CreatePropertyDto = z.infer<
  typeof landLordPropertyDtoSchema.createPropertyData
>;

export type UpdatePropertyDto = z.infer<
  typeof landLordPropertyDtoSchema.updatePropertyData
>;
