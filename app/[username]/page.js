import React from 'react';
import PaymentPage from '@/components/PaymentPage';
import { notFound } from 'next/navigation';
import connectDb from '@/db/connectDb';
import User from '@/models/User';

export const dynamic = "force-dynamic";

const Username = async ({ params }) => {
  const username = params?.username;
  if (!username) {
    return notFound();
  }

  await connectDb();
  const user = await User.findOne({ username });
  if (!user) {
    return notFound();
  }

  return <PaymentPage username={username} />;
};

export default Username;