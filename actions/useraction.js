"use server"
import Razorpay from "razorpay"
import Payment from "@/models/Payment";
import User from "@/models/User";
import connectDb from "@/db/connectDb";

export const initiate = async (amount, to_username, paymentform) => {
  await connectDb();
  // fetch the secret of the user who is getting the payment 
  let user = await User.findOne({username: to_username})
  const secret = user.razorpaysecret

  var instance = new Razorpay({
    key_id: user.razorpayid,
    key_secret: secret,
  });

 let options = {
    amount: Number.parseInt(amount),
    currency: "INR",
 }

 let x = await instance.orders.create(options)

 // create a  payment object which show a pending payment in the database

 await Payment.create({oid: x.id, amount: amount/100, to_user: to_username, name:paymentform.name, message:paymentform.message})

 return x
};

export const fetchuser = async(username)=>{
  await connectDb()
  let u = await User.findOne({username: username})
  if (!u) {
    throw new Error('User not found');
  }
    let user = u.toObject({flattenObjectIds: true});

  // let user = {
  //   id: u._id.toString(), // Convert ObjectId to string
  //   email: u.email,
  //   username: u.username,
  //   createdAt: u.createdAt,
  //   updatedAt: u.updatedAt,
  // };
  return user
}

export const fetchpayments = async(username)=>{
  
  try {
    await connectDb()
    let p = await Payment.find({ to_user: username, done:true }).sort({ amount: -1 }).limit(10).lean()
    return p
  } catch (error) {
    console.error("Error fetching payments:", error)
    throw error
  }

}

export const updateProfile = async (data,oldusername) =>{
  await connectDb() // Step 1: Connect to the database
  let ndata = Object.fromEntries(data) // Step 2: Convert FormData to an object

  //If the username is being updated ,chack if username is available
  if(oldusername !== ndata.username){
    let u = await User.findOne({username: ndata.username})
    if (u){
      return {error:"Username is already exists"} // Step 5: Return an error if the username is taken
    }
  
// Step 6: Update the user profile
  await User.updateOne({email: ndata.email}, ndata)
  
  
   // Now update all the usernames in the Payments table 
   await Payment.updateMany({to_user: oldusername}, {to_user: ndata.username})

  }
   else{   
    await User.updateOne({email: ndata.email}, ndata)
    }


}
