import NextAuth from "next-auth";
import Providers from "next-auth/providers";

import { compare as verifyPassword, hash } from "bcryptjs";
import connectToDatabase from "../../../backend/dbConnect";
import User from "../../../backend/models/User";

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials: Record<string, string>) {
        await connectToDatabase();

        console.log(credentials.email);
        const user = await User.findOne({
          email: credentials.email,
        });
        
        // Should probably remove this in the future for security sake
        if (!user) {
          throw new Error("No user found!");
        }

        const isValid = await verifyPassword(credentials.password, user.passwordHash);

        if (!isValid) {
          throw new Error("Could not log you in!");
        }

        console.log(user);
        return user;
      },
    }),
  ],
});
