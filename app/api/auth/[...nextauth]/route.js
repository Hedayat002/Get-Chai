import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import User from '@/models/User';
import connectDb from "@/db/connectDb";

export const authOptions = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account, profile, email }) {
      if (account.provider !== "github") {
        return false;
      }

      await connectDb();
      const userEmail = user?.email || email?.value || profile?.email;
      if (!userEmail) {
        return false;
      }

      const currentUser = await User.findOne({ email: userEmail });
      if (!currentUser) {
        await User.create({
          email: userEmail,
          username: userEmail.split("@")[0],
        });
      }
     
      return true
    }
   
  },
  async session({ session, user, token }) {
    const dbUser = await User.findOne({email: session.user.email});
    session.user.name = dbUser.username
    return session
  },
}


  })

  export {authOptions as GET , authOptions as POST}