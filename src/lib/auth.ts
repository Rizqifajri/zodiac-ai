import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { AuthOptions } from "next-auth"
import EmailProvider from "next-auth/providers/email"
import db from "./db"


export const options = {
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(db),
  session: {
    strategy: "database",
    maxAge: 30 * 24 * 60 * 60
  },
  pages: {
    signIn: "/auth/signin",
    verifyRequest: "/auth/verify-request",
  },
  callbacks: {
    async session({session, user}) {
      session.user = user;
      return session
    }  
  },
  events: {
    async signIn({user, isNewUser}) {
      console.log({user}, 'Sign In')
      if (isNewUser) {
        await db.user.create({
          data: {
            email: user.email as string,
            name: user.name,
            image: user.image
          }
        })
      }
    }
    
  }
}satisfies AuthOptions