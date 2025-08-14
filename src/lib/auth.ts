import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import bcrypt from "bcryptjs";
import prisma from "./db";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please correctly fill the form and try again.");
        }

        try {
          const user = await prisma.user.findUnique({
            where: {
              email: credentials?.email,
            },
          });

          if (!user) {
            throw new Error("No user found!");
          }

          if(user.provider !== 'Credentials'){
            throw new Error(`You are signed up with ${user.provider}. Please try again.`);
          }

          const isValid = await bcrypt.compare(
            credentials.password,
            user.password!
          );

          if (!isValid) {
            throw new Error("Invalid Email or Password");
          }

          return user;
        } catch (error) {
          console.error(error);
          throw error;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email! },
        });
        token.id = dbUser?.id;
        token.role = dbUser?.role;
      }
      return token;
    }
    ,
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    }
    ,
    async signIn({ account, user }) {
      console.log("user is ", user);
      if (!user?.email) {
        console.error("No email found in the user object");
        return false;
      }
      try {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
        });

        if (!existingUser) {
          console.log(`Creating new user with email: ${user.email}`);
          if (account?.provider === "google") {
            await prisma.user.create({
              data: {
                name:user.name,
                email: user.email,
                provider: "Google",
                avatarUrl: user.image,
                role: "User",
              },
            });
          } else {
            await prisma.user.create({
              data: {
                name:user.name,
                email: user.email,
                provider: "Github",
                avatarUrl: user.image,
                role: "User",
              },
            });
          }
        } else {
          console.log(`User with email ${user.email} already exists.`);
        }
      } catch (error) {
        console.error(`Error during ${account?.provider} sign-in: ${error}`);
        return false;
      }

      // Returning a true value indicates a successful sign-in
      return true;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 15 * 24 * 60 * 60, // for 15 days
  },
  secret: process.env.NEXTAUTH_SECRET,
};