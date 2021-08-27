import NextAuth from "next-auth";
import Providers from "next-auth/providers";

const options = {
  providers: [
    Providers.Credentials({
      name: "Custom Provider",
      credentials: {
        username: {
          label: "Email",
          type: "text",
          placeholder: "tony@dang.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = { name: "Tony Dang", email: "tony@dang.com" };
        return user;
      },
    }),
  ],
  session: {
    jwt: true,
  },
};

export default (req, res) => NextAuth(req, res, options);
