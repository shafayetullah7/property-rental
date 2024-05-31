import mongoose, { Document, Schema } from "mongoose";

// Define interface for Landlord document
interface ILandlord extends Document {
  profileImage?: string;
  name: string;
  bio?: string;
  mobileNumber?: string;
  whatsAppNumber?: string;
  officeNumber?: string;
  email: string;
  password: string;
  dateOfBirth?: string;
  nationality?: string;
  nidImage?: string;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Define Mongoose schema for Landlord
const landlordSchema = new Schema<ILandlord>(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
    },
    bio: {
      type: String,
    },
    mobileNumber: {
      type: String,
    },
    whatsAppNumber: {
      type: String,
    },
    officeNumber: {
      type: String,
    },

    dateOfBirth: {
      type: String,
    },
    nationality: {
      type: String,
    },
    nidImage: {
      type: String,
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Define Landlord model
const Landlord = mongoose.model<ILandlord>("Landlord", landlordSchema);

export { Landlord, ILandlord };
