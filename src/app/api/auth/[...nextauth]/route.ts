import NextAuth from "next-auth/next";
import { authConfig } from "@/lib/auth";

const handler = NextAuth(authConfig as any);
export { handler as GET, handler as POST }