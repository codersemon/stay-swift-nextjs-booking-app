// dependencies
import mongoose from "mongoose";

// create schema
const bookingSchema = new mongoose.Schema(
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
    checkin: {
      type: String,
      required: true,
    },
    checkout: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    basePrice: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

// export model
export const bookingModel =
  mongoose.models.bookings ?? mongoose.model("bookings", bookingSchema);
