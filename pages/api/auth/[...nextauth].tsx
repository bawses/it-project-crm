import NextAuth from "next-auth";
import Providers from "next-auth/providers";

import { verifyPassword } from "../../../backend/lib/auth";
import connectToDatabase from "../../../backend/lib/DbConnect";
import User from "../../../backend/models/User";

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials: Record<string, string>) {
        const client = await connectToDatabase();

        console.log(credentials.email);
        const user = await User.findOne({
          email: credentials.email,
        });

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
