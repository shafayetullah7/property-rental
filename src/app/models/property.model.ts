import mongoose, { Document, Schema, Types } from "mongoose";

// Define interface for Property document
interface IProperty extends Document {
  propertyName: string;
  propertyPrice: number;
  propertyUploadingDate: Date;
  lastStatusUpdatingDate: Date;
  propertyStatus: "Available" | "Rented";
  propertyType: "Flat" | "House";
  propertyID: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  propertyBio: string;
  propertyVideo: string;
  propertyLocation: {
    longitude: number;
    latitude: number;
  };
  owner: Types.ObjectId; // Reference to Landlord
  createdAt: Date;
  updatedAt: Date;
  propertyImages?: string[]; // Array of image URLs
  propertyDocuments: string; // URL or path to documents
}

// Define Mongoose schema for Property
const propertySchema = new Schema<IProperty>(
  {
    propertyName: {
      type: String,
      required: true,
    },
    propertyPrice: {
      type: Number,
      required: true,
    },
    propertyUploadingDate: {
      type: Date,
      required: true,
    },
    lastStatusUpdatingDate: {
      type: Date,
      required: true,
    },
    propertyStatus: {
      type: String,
      enum: ["Available", "Rented"],
      required: true,
    },
    propertyType: {
      type: String,
      enum: ["Flat", "House"],
      required: true,
    },
    propertyID: {
      type: String,
      required: true,
    },
    bedrooms: {
      type: Number,
      required: true,
    },
    bathrooms: {
      type: Number,
      required: true,
    },
    area: {
      type: Number,
      required: true,
    },
    propertyBio: {
      type: String,
      required: true,
    },
    propertyVideo: {
      type: String,
      required: true,
    },
    propertyLocation: {
      longitude: {
        type: Number,
        required: true,
      },
      latitude: {
        type: Number,
        required: true,
      },
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "Landlord", // Reference to Landlord model
      required: true,
    },
    propertyImages: {
      type: [String],
    },
    propertyDocuments: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Define Property model
const Property = mongoose.model<IProperty>("Property", propertySchema);

export { Property, IProperty };
