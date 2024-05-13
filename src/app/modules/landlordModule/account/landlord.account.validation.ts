import { z } from "zod";

// Define Zod schema for Landlord creation
const createLandlordData = z.object({
  email: z.string().email(),
  password: z.string(),
});

const loginLandlordData = z.object({
  email: z.string().email(),
  password: z.string(),
});

const verifyLandlordData = z.object({
  profileImage: z.string(),
  name: z.string(),
  bio: z.string(),
  mobileNumber: z.string(),
  whatsAppNumber: z.string(),
  officeNumber: z.string(),
  dateOfBirth: z.string().date(),
  nationality: z.string(),
  nidImage: z.string(),
});

const udpateLandlordData = z
  .object({
    profileImage: z.string(),
    name: z.string(),
    bio: z.string(),
    mobileNumber: z.string(),
    whatsAppNumber: z.string(),
    officeNumber: z.string(),
    dateOfBirth: z.string().date(),
    nationality: z.string(),
    nidImage: z.string(),
  })
  .partial();

const createLandlordSchema = z.object({
  body: createLandlordData,
});

const loginLandlordSchema = z.object({
  body: loginLandlordData,
});

const verifyLandlordSchema = z.object({
  body: verifyLandlordData,
});

const updateLandlordSchema = z.object({
  body: udpateLandlordData,
});

export const landlordAccountDtoSchema = {
  createLandlordData,
  verifyLandlordData,
  udpateLandlordData,
  loginLandlordData,
};

export const landlordAccountValidation = {
  createLandlordSchema,
  verifyLandlordSchema,
  updateLandlordSchema,
  loginLandlordSchema,
};
