import NextAuth, { Account, Profile, TokenSet } from "next-auth";
import Providers from "next-auth/providers";
import { Session, User as authUser} from "next-auth";
import { JWT } from "next-auth/jwt";

import { compare as verifyPassword, hash } from "bcryptjs";
import connectToDatabase from "../../../backend/dbConnect";
import User from "../../../backend/models/User";
import mongoose from "mongoose";

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    })
    ,
    Providers.Credentials({
      async authorize(credentials: Record<string, string>) {
        await connectToDatabase();
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
        return user;
      },
    }),
  ],
  callbacks:{
    signIn: async (user:any, account:any, profile:any) : Promise<any> => {
        console.log("Signing In...");
        await connectToDatabase();
        if (account.provider === "google"){
          console.log(user.email);
          const findUser = await User.findOne({email:user.email})
          console.log("Yeetus");
          console.log(findUser);

          if (!findUser){
            console.log("here");
            const nameArr = user.name.split(" "); 
            console.log(nameArr);
            const createUser = await User.create({
              name: {firstName: nameArr[0], lastName: nameArr[1]},
              fullName: user.name,
              email: [String(user.email)],
              passwordHash: await hash(user.email, 10),
              imageUrl: user.image,
            }) 
            console.log("Created new user account");
            console.log(createUser);
            return Promise.resolve(createUser);
          }else{
            console.log("found user!");
            return Promise.resolve(findUser)
          }
        }
        else{
          console.log("Not using Google To Sign In!")  
        }
    },
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
        await connectToDatabase();
        const findUser = await User.findOne({email: userOrToken.email})
        if (findUser){
          userOrToken.sub = findUser._id;
        }
        console.log(userOrToken);
        session.user = userOrToken;
        return Promise.resolve(session);
    },
  }
});