import { z } from "zod";
import { openPropertiesDtoSchema } from "./open.property.validation";

export type GetPropertiesQuery = z.infer<
  typeof openPropertiesDtoSchema.getProperiesQuery
>;
