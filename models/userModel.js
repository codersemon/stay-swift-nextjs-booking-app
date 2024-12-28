// dependencies
import bcrypt from "bcrypt";
import mongoose from "mongoose";

// create schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: String,
  },
  { timestamps: true }
);

// hash the password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    return next(error);
  }
});



// export user model
export const userModel =
  mongoose.models.users ?? mongoose.model("users", userSchema);
