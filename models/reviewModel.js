// dependencies
import mongoose from "mongoose";

// create schema
const reviewSchema = new mongoose.Schema(
  {
    hotelId: {
      type: mongoose.Schema.ObjectId,
      ref: "hotels",
      required: true,
    },
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "users",
      required: true,
    },
    review: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// export model
export const reviewModel =
  mongoose.models.reviews ?? mongoose.model("reviews", reviewSchema);
