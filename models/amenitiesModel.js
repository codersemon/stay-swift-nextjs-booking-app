// dependencies
import mongoose from "mongoose";

// create schema
const amenitiesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    instructions: Sting,
    hours: String,
  },
  { timestamps: true }
);

// export model
export const amenitiesModel =
  mongoose.models.amenities ?? mongoose.model("amenities", amenitiesSchema);
