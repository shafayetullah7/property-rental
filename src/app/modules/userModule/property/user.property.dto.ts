import { z } from "zod";
import { wishesDtoSchema } from "./user.property.validation";

export type GetWishesQuery = z.infer<typeof wishesDtoSchema.getWishesQuery>;

export type UpdateWishBody = z.infer<
  typeof wishesDtoSchema.updateWishlistScheduleBody
>;
