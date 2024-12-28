// dependencies
import mongoose from "mongoose";

// create schema
const ratingSchema = new mongoose.Schema(
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
    rating: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

// export model
export const ratingModel =
  mongoose.models.ratings ?? mongoose.model("ratings", ratingSchema);
