import mongoose, { Document, Schema, Model } from "mongoose";

// Define an interface for the UserWishlist document
interface IWishlist extends Document {
  userId: mongoose.Types.ObjectId;
  propertyId: mongoose.Types.ObjectId;
  status: "pending" | "accepted" | "rejected";
  meetingDate?: Date; // Optional meeting date
  meetingStart?: string; // Optional meeting start time in 24hr format
  meetingEnd?: string; // Optional meeting end time in 24hr format
  meetingApproval?: "accepted" | "rejected" | "pending"; // Optional meeting approval status
  createdAt: Date; // Auto-generated timestamp
  updatedAt: Date; // Auto-generated timestamp
}

// Create a Schema corresponding to the document interface
const WishlistSchema: Schema<IWishlist> = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    }, // Reference to User model
    propertyId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Property",
    }, // Reference to Property model
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    }, // Fixed status 'pending'
    meetingDate: { type: Date, default: null },
    meetingStart: {
      type: String,
      default: null,
    },
    meetingEnd: {
      type: String,
      default: null,
    },
    meetingApproval: {
      type: String,
      enum: ["accepted", "rejected", "pending"],
      default: "pending",
    },
  },
  {
    timestamps: true, // This adds createdAt and updatedAt fields automatically
  }
);

// Create a UserWishlist model from the schema
const Wishlist: Model<IWishlist> = mongoose.model<IWishlist>(
  "UserWishlist",
  WishlistSchema
);

export { Wishlist, IWishlist };
