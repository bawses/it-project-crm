import NextAuth from "next-auth";
import Providers from "next-auth/providers";

import { verifyPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";
import User from "../../../models/User";

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        const client = await connectToDatabase();
        //const usersCollection = client.db().collection('individuals');

        console.log(credentials.email);
        const user = await User.findOne({
          email: credentials.email,
        });

        if (!user) {
          client.connection.close();
          throw new Error("No user found!");
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          client.connection.close();
          throw new Error("Could not log you in!");
        }

        client.connection.close();
        return { email: user.email };
      },
    }),
  ],
});
