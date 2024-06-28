import { z } from "zod";
import { landLordPropertyDtoSchema } from "./landlord.property.validation";

export type CreatePropertyDto = z.infer<
  typeof landLordPropertyDtoSchema.createPropertyData
>;

export type UpdatePropertyDto = z.infer<
  typeof landLordPropertyDtoSchema.updatePropertyData
>;

export type GetPropertyQueryDto = z.infer<
  typeof landLordPropertyDtoSchema.getPropertyQuery
>;

export type MeetingApprovalDto = z.infer<
  typeof landLordPropertyDtoSchema.meetingApprovalData
>;

export type RentApprovalDto = z.infer<
  typeof landLordPropertyDtoSchema.rentApprovalData
>;
