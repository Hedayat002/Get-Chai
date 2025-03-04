import mongoose from "mongoose";
const { Schema, model } = mongoose;

const paymentSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    to_user:{
        type:String,
        required:true
    },
    oid:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    message:{
        type:String,
    },
    done: { type: Boolean, 
            default: false 
        },


},{timestamps:true})

export default mongoose.models.Payment || model("Payment", paymentSchema);;