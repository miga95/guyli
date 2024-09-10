import NextAuth, { NextAuthOptions } from "next-auth"
import { compare } from "bcrypt";
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials";
import EmailProvider from "next-auth/providers/email"

import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from '@prisma/client';

import prisma from "@/lib/prisma";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    }
  }

  interface User {
    id: string;
  }
}

export const authOptions: NextAuthOptions = {
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.sub;
      }
      return session;
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt"
  },
  pages:{
    signIn: '/auth/signIn',
    // error: 'auth/error',
    // signOut:'auth/signout'
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: { label: "Password", type: "password", placeholder: "Password" }
      },
      async authorize(credentials, req) {
        const prismaClient = new PrismaClient();
        const user = await prismaClient.user.findUnique({
          where: {
            email: credentials?.email,
          },
          include: {
            accounts: true,
          }
        })

        if(user) {
          const passwordCorrect = await compare(credentials?.password! || '', user.password!)              
          if ( passwordCorrect) return user
        }
        return null;
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_SECRET ?? "",
    }),
    // EmailProvider({
    //   server: process.env.EMAIL_SERVER,
    //   from: process.env.EMAIL_FROM,
    //   maxAge: 24 * 60 * 60, // How long email links are valid for (default 24h)
    // }),
    // ...add more providers here
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET
}
export default NextAuth(authOptions)