import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/lib/prisma";
import { Adapter } from "next-auth/adapters"
import Google from "next-auth/providers/google"
import Github from "next-auth/providers/github"
import Resend from "next-auth/providers/resend"
export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  theme: {
    logo: "/logo.png",
  },
  providers: [Google, Github, Resend({
    from: "no-reply@emails.webdevka14.in"
  })],
  callbacks: {
    session({ session, user }) {
      session.user.role = user.role
      return session
    }
  },
  adapter: PrismaAdapter(prisma) as Adapter
})
