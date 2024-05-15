import { z } from "zod";
import { AdminAccountDtoSchema } from "./admin.account.validation";

export type CreateAdminDto = z.infer<
  typeof AdminAccountDtoSchema.createAdminData
>;

export type LoginAdminDto = z.infer<
  typeof AdminAccountDtoSchema.loginAdminData
>;

export type UpdateAdminDto = z.infer<
  typeof AdminAccountDtoSchema.udpateAdminData
>;
