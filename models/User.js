import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      
    },

    username: {
      type: String,
      required: true
    },

    profilepic: {
      type: String,
      default: "",
    },

    coverpic: {
      type: String,
      default: "",
    },

    razorpayid: {
      type: String,
      default: "",
    },

    razorpaysecret: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

// Prevent model overwrite error in Next.js
export default mongoose.models.User || mongoose.model("User", UserSchema);
