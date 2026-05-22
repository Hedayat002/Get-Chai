import React from 'react'
import PaymentPage from '@/components/PaymentPage'
import { notFound } from 'next/navigation';
import connectDb from '@/db/connectDb';
import User from '@/models/User';

const Username = async ({ params }) => {
  // 1. Params ko sabse pehle await kijiye
  const { username } = await params;

  // 2. Database check function
  const checkUser = async () => {
    await connectDb()
    
    // Case-insensitive check lagayein taaki lowercase/uppercase ka lafda na ho
    let u = await User.findOne({ 
      username: { $regex: new RegExp(`^${username}$`, "i") } 
    })
    
    if (!u) {
      return notFound() // Agar user nahi mila toh Next.js 404 page dikha dega
    }
    return u;
  }

  // Check user ko execute karein
  await checkUser()

  return (
    <>
      {/* 3. Awaited username ko hi prop me pass karein */}
      <PaymentPage username={username} />
    </>
  )
}

export default Username
