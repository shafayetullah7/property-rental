import mongoose, { Document, Schema, Types } from "mongoose";

// Define interface for Property document
interface IProperty extends Document {
  _id: Types.ObjectId;
  propertyName: string;
  propertyPrice: number;
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
  locationUrl: string;
  owner: Types.ObjectId; // Reference to Landlord
  createdAt: Date;
  updatedAt: Date;
  propertyImages?: string[]; // Array of image URLs
  propertyDocuments: string; // URL or path to documents
  isVerified: boolean;
}

// Define Mongoose schema for Property
const propertySchema = new Schema<IProperty>(
  {
    propertyName: {
      type: String,
      required: true,
      default: null,
    },
    propertyPrice: {
      type: Number,
      required: true,
      default: null,
    },
    propertyStatus: {
      type: String,
      enum: ["Available", "Rented"],
      required: true,
      default: "Available",
    },
    propertyType: {
      type: String,
      enum: ["Flat", "House"],
      required: true,
      default: null,
    },
    bedrooms: {
      type: Number,
      required: true,
      default: null,
    },
    bathrooms: {
      type: Number,
      required: true,
      default: null,
    },
    area: {
      type: Number,
      required: true,
      default: null,
    },
    propertyBio: {
      type: String,
      required: true,
      default: null,
    },
    propertyVideo: {
      type: String,
      required: true,
      default: null,
    },
    propertyLocation: {
      longitude: {
        type: Number,
        required: true,
        default: null,
      },
      latitude: {
        type: Number,
        required: true,
        default: null,
      },
    },
    locationUrl: {
      type: String,
      default: null,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "Landlord", // Reference to Landlord model
      required: true,
    },
    propertyImages: {
      type: [String],
      default: null,
    },
    propertyDocuments: {
      type: String,
      required: true,
      default: null,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Define Property model
const Property = mongoose.model<IProperty>("Property", propertySchema);

export { Property, IProperty };
