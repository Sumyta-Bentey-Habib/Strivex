import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbconnect from "./dbconnect";
import { compare } from "bcrypt";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const usersCollection = await dbconnect("users");
        const user = await usersCollection.findOne({ email: credentials.email });

        if (!user) return null;

        const isValid = await compare(credentials.password, user.password);
        if (!isValid) return null;

        return { name: user.name, email: user.email };
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/auth/login" },
};
