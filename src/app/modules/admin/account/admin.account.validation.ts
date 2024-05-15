import { z } from "zod";

const createAdminData = z.object({
  profile: z.string().url().optional(),
  name: z.string().trim().min(1).max(255).optional(),
  mobile: z.string().trim().min(10).max(20).optional(),
  email: z.string().email(),
  password: z.string().min(8).max(30),
});

const loginAdminData = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(30),
});

const udpateAdminData = z
  .object({
    profile: z.string().url().optional(),
    name: z.string().trim().min(1).max(255).optional(),
    mobile: z.string().trim().min(10).max(20).optional(),
  })
  .partial();

const createAdminSchema = z.object({
  body: createAdminData,
});

const loginAdminSchema = z.object({
  body: loginAdminData,
});

const updateAdminSchema = z.object({
  body: udpateAdminData,
});

export const AdminAccountDtoSchema = {
  createAdminData,
  loginAdminData,
  udpateAdminData,
};

export const adminAccountValidation = {
  createAdminSchema,
  loginAdminSchema,
  updateAdminSchema,
};
