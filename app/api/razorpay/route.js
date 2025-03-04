import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/models/Payment";
import Razorpay from "razorpay";
import connectDb from "@/db/connectDb";
import User from "@/models/User";

export const POST = async (req) => {
  await connectDb();
  let body = await req.formData();
  body = Object.fromEntries(body);

  //chack if razorpayOrderId is persent on the server

  let razorpayOrderId = await Payment.findOne({ oid: body.razorpay_order_id });
  if (!razorpayOrderId) {
    return NextResponse.json({ success: false, message: "Order Id not found" });
  }

  //fetch the secret of the user who is getting the payment

  let user = await User.findOne({ username: razorpayOrderId.to_user });
  const secret = user.razorpaysecret;

  //varify the Payment
  let veryfyPayment = validatePaymentVerification(
    { order_id: body.razorpay_order_id, payment_id: body.razorpay_payment_id },
    body.razorpay_signature,
    secret
  );

  if (veryfyPayment) {
    //update the payment status

    const updatePayment = await Payment.findOneAndUpdate(
      { oid: body.razorpay_order_id },
      { done: "true" },
      { new: true }
    );
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_URL}/${updatePayment.to_user}?paymentdone=true`
    );
  } else {
    return NextResponse.json({
      success: false,
      message: "Payment Varified Failed",
    });
  }
};
