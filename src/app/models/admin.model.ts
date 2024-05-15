import mongoose, { Document, Schema } from "mongoose";

// Define interface for Admin document
interface IAdmin extends Document {
  email: string;
  mobile: string;
  password: string;
  name: string;
  profile: string;
}

// Define Mongoose schema for Admin
const adminSchema = new Schema<IAdmin>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    profile: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Define Admin model
const Admin = mongoose.model<IAdmin>("Admin", adminSchema);

export { Admin, IAdmin };
