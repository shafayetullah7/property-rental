import { z } from "zod";
import { landlordAccountDtoSchema } from "./landlord.account.validation";

export type CreateLandlordDto = z.infer<
  typeof landlordAccountDtoSchema.createLandlordData
>;

export type LoginLandlordDto = z.infer<
  typeof landlordAccountDtoSchema.loginLandlordData
>;

export type VerifyLandlordDto = z.infer<
  typeof landlordAccountDtoSchema.verifyLandlordData
>;

export type UpdateLandlordDto = z.infer<
  typeof landlordAccountDtoSchema.udpateLandlordData
>;
