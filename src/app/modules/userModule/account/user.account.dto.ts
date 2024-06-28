import { z } from "zod";
import { userAccountDtoSchema } from "./user.account.validation";

export type RegisterUserDto = z.infer<
  typeof userAccountDtoSchema.registerUserBody
>;

export type LoginUserDto = z.infer<typeof userAccountDtoSchema.loginUserBody>;

export type VerifyUserDto = z.infer<typeof userAccountDtoSchema.verifyUserData>;
export type UpdateUserDto = z.infer<typeof userAccountDtoSchema.updateUserData>;
