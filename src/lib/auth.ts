import { prisma } from "@/lib/db";
import getServerSession from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authConfig = {
  adapter: PrismaAdapter(prisma as any),
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
  pages: {
    signIn: "/auth/signin",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      type: "credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials: any) {
        if (!credentials.email || !credentials.password) {
          return null;
        }
        //get user
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        if (!user) {
          console.log("there is no related user");
          return null;
        }
        try {
          const passwordMatch = await bcrypt.compare(
            credentials.password,
            user.password as string
          );
          if (passwordMatch) {
            return user;
          }
          console.log("invalid credentials");
          return null;
        } catch (error) {
          console.error("Error during password comparison:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
    session: async ({ session, token }: { session: any; token: any }) => {
      if (session?.user) {
        session.user.id = token.sub;
      }
      return session;
    },
    jwt: async ({ user, token }: { user: any; token: any }) => {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  trustHost: true,
};

export const getAuthSession = () => getServerSession(authConfig as any);
