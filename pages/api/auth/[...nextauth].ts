import NextAuth, { Account, Profile, TokenSet } from "next-auth";
import Providers from "next-auth/providers";
import { Session, User as authUser} from "next-auth";
import { JWT } from "next-auth/jwt";
import { Database } from "../../../backend/models/DbMapping";
import { compare as verifyPassword, hash } from "bcryptjs";
import connectToDatabase from "../../../backend/dbConnect";
import User from "../../../backend/models/User";
import { DataType } from "../../../lib/EnumTypes";
import Organisation from "../../../backend/models/Organisation";

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

        var dataType: DataType;
        const entity = verifyEntity(credentials);
        
        return entity;
      },
    }),
  ],
  callbacks:{
    signIn: async (user:any, account:any, profile:any) : Promise<any> => {
        console.log("Signing In...");
        await connectToDatabase();

        if (account.provider === "google"){
          const findUser = await User.findOne({email:user.email})
          //const findOrg = await Organisation.findOne({email:user.email})
          
          if (!findUser){
            const nameArr = user.name.split(" "); 
            const createUser = await User.create({
              name: {firstName: nameArr[0], lastName: nameArr[1]},
              fullName: user.name,
              email: [String(user.email)],
              passwordHash: await hash(user.email, 10),
              imageUrl: user.image,
            }) 
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

        await connectToDatabase();
        const findUser = await User.findOne({email: userOrToken.email[0]});
        const findOrg = await Organisation.findOne({email: userOrToken.email[0]});

        console.log("====================================");
        console.log(userOrToken.email[0]);
        console.log("------------------------------------");
        console.log(findOrg);
        console.log("====================================");
        if (findUser){
          userOrToken.sub = findUser._id;
          userOrToken.type = DataType.User;
        }
        else{
          userOrToken.sub = findOrg._id;
          userOrToken.type = DataType.Organisation;
        }
        
        session.user = userOrToken;
        return Promise.resolve(session);
    },
  }
});

async function verifyEntity(credentials: Record<string,string>){

    const dbCollectionOrg = Database[DataType.Organisation];
    const dbCollectionUser = Database[DataType.User];

    const user = await dbCollectionUser.findOne({
      email: credentials.email,
    });
    const org = await dbCollectionOrg.findOne({
      email: credentials.email,
    });

    // Should probably remove this in the future for security sake
    if (!user && !org) {
      throw new Error("No user/org found!");
    }

    let isValid;
    if (user){
      isValid = await verifyPassword(credentials.password, user.passwordHash);
    }
    else{
      isValid = await verifyPassword(credentials.password, org.passwordHash);
    }

    if (!isValid) {
      throw new Error("Could not log you in!");
    }

    if (user){
      return user;
    }
    return org;

}