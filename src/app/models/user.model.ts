import mongoose, { Document, Schema, Model, Types } from "mongoose";

// Define an interface for the User document
interface IUser extends Document {
  // _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  nid?: string; // Optional
  image?: string; // Optional
  phone?: string; // Optional
  whatsapp?: string; // Optional
  nationality?: string; // Optional
  dob?: string; // Optional
  verified: boolean; // Required with default value
  createdAt: Date;
  updatedAt: Date;
}

// Create a Schema corresponding to the document interface
const UserSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // Unique constraint
    password: { type: String, required: true },
    nid: { type: String, required: false }, // Optional field
    image: { type: String, required: false }, // Optional field
    phone: { type: String, required: false }, // Optional field
    whatsapp: { type: String, required: false }, // Optional field
    nationality: { type: String, required: false }, // Optional field
    dob: { type: String, required: false }, // Optional field
    verified: { type: Boolean, default: false, required: true }, // Required with default value false
  },
  {
    timestamps: true, // This adds createdAt and updatedAt fields automatically
  }
);

// Create a User model from the schema
const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema);

export { User, IUser };
