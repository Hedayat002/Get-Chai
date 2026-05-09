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

  const razorpayOrder = await Payment.findOne({ oid: body.razorpay_order_id });
  if (!razorpayOrder) {
    return NextResponse.json({ success: false, message: "Order Id not found" });
  }

  const user = await User.findOne({ username: razorpayOrder.to_user });
  if (!user || !user.razorpaysecret) {
    return NextResponse.json({ success: false, message: "User or Razorpay secret not found" });
  }

  const verifyPayment = validatePaymentVerification(
    { order_id: body.razorpay_order_id, payment_id: body.razorpay_payment_id },
    body.razorpay_signature,
    user.razorpaysecret
  );

  if (verifyPayment) {
    const updatePayment = await Payment.findOneAndUpdate(
      { oid: body.razorpay_order_id },
      { done: true },
      { new: true }
    );

    const baseUrl = process.env.NEXTAUTH_URL || process.env.NEXT_PUBLIC_URL;
    return NextResponse.redirect(
      `${baseUrl}/${updatePayment.to_user}?paymentdone=true`
    );
  }

  return NextResponse.json({
    success: false,
    message: "Payment verification failed",
  });
};
