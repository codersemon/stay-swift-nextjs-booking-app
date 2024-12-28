// dependencies
import mongoose from "mongoose";

// create schema
const hotelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address1: {
      type: String,
      required: true,
    },
    airportCode: {
      type: String,
      required: true,
    },
    city: String,
    countryCode: String,
    highRate: Number,
    lowRate: Number,
    locationDescription: String,
    propertyCategory: Number,
    stateProvinceCode: String,
    thumbNailUrl: String,
    overview: String,
    gallery: [{ type: String }],
    amenities: [{ type: mongoose.Schema.ObjectId, ref: "amenities" }],
  },
  { timestamps: true }
);

// export model
export const hotelModel =
  mongoose.models.hotels ?? mongoose.model("hotels", hotelSchema);
