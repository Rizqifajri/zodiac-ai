import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const globalForPrisma = global as unknown as { prisma: PrismaClient };
const db = globalForPrisma.prisma || prisma;

if (process.env.NODE_ENV !== "production"){
  globalForPrisma.prisma = db;
} 

export default db;