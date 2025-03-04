import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
     
    },
    email: {
      type: String,
      required: true,
      
    },
    username: {
      type: String,
      required: true
    },
    profilepic: { type: String },
    coverpic: {
      type: String,
    },
    razorpayid: { type: String },
    razorpaysecret: { type: String },
  },
  
  {
    timestamps: true,
  }
);

// export const User = mongoose.model("User", userSchema);

export default mongoose.models.User || model("User", userSchema);;
