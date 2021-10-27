import NextAuth from "next-auth"
import { DataType } from "../../../lib/EnumTypes";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: User
  }

  interface User {
    type: DataType,
    sub: string,
    name: string,
    email: string   
  }
}