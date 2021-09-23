import NextAuth, { Account, Profile, TokenSet } from "next-auth";
import Providers from "next-auth/providers";
import { Session, User as authUser} from "next-auth";
import { JWT } from "next-auth/jwt";

import { compare as verifyPassword, hash } from "bcryptjs";
import connectToDatabase from "../../../backend/dbConnect";
import User from "../../../backend/models/User";
import { JWTEncodeParams } from "next-auth/jwt";

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
  callbacks:{
    jwt: async (token: JWT, user?: authUser | undefined, account?: Account | undefined, profile?: Profile | undefined, isNewUser?: boolean | undefined) => {
        //  "user" parameter is the object received from "authorize"
        //  "token" is being send below to "session" callback...
        //  ...so we set "user" param of "token" to object from "authorize"...
        //  ...and return it...
        return Promise.resolve(token)   // ...here
    },
    session: async (session: Session, userOrToken: authUser) : Promise<Session> => {
        //  "session" is current session object
        //  below we set "user" param of "session" to value received from "jwt" callback
/*         console.log("---------------------------------------------------")
        console.log(userOrToken);
        console.log("---------------------------------------------------") */
        session.user = userOrToken;
        return Promise.resolve(session)
    }
  }
});