// dependencies
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { userModel } from "./models/userModel";
import connectMongoDB from "./service/connectMongoDB";
import client from "./service/mongodbClientPromise";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: MongoDBAdapter(client),
  session: {
    strategy: "jwt",
  },
  providers: [
    Google,
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        // if null, then return null
        if (credentials === null) return null;

        try {
          // setup db connection
          await connectMongoDB();

          // find user by email
          const user = await userModel.findOne({ email: credentials?.email });

          // if user found
          if (user) {
            const isPasswordMatched = bcrypt.compare(
              credentials?.password,
              user?.password
            );

            // if password matched
            if (isPasswordMatched) {
              return user;
            } else {
              // if password not matched
              throw new Error("Email or password is wrong!");
            }
          } else {
            // if user not found
            throw new Error("Email is not registered!");
          }
        } catch (error) {
          throw new Error(error?.message ?? "Something went wrong!");
        }
      },
    }),
  ],
});
