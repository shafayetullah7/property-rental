import { z } from "zod";
import { AdminPropertiesDtoSchema } from "./admin.properties.validation";

export type GetAllPropertyQueryDto = z.infer<
  typeof AdminPropertiesDtoSchema.getAllPropertyQuery
>;
