import { z } from "zod";

const registerUserBody = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

const loginUserBody = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string(),
});

const verifyUserData = z.object({
  nid: z.string(), // Optional
  image: z.string().url("Invalid URL for image"), // Optional and must be a valid URL if provided
  phone: z.string(), // Opt
  nationality: z.string(),
  dob: z.string().date(),
});

const updateUserData = z
  .object({
    name: z.string(),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    nid: z.string(), // Optional
    image: z.string().url("Invalid URL for image"), // Optional and must be a valid URL if provided
    phone: z.string(), // Opt
    nationality: z.string(),
    dob: z.string().date(),
  })
  .partial();

const registerUserSchema = z.object({
  body: registerUserBody,
});

const loginUserSchema = z.object({
  body: loginUserBody,
});

const verifyUserSchema = z.object({
  body: verifyUserData,
});

const updateUserSchema = z.object({
  body: updateUserData,
});

export const userAccountDtoSchema = {
  registerUserBody,
  loginUserBody,
  verifyUserData,
  updateUserData,
};

export const userAccountValidation = {
  registerUserSchema,
  loginUserSchema,
  verifyUserSchema,
  updateUserSchema,
};
