
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient()

const globalForPrisma = global as unknown as { prisma: typeof prisma };
const db = globalForPrisma.prisma || prisma;

if (process.env.NODE_ENV !== "production"){
  globalForPrisma.prisma = db;
} 

export default db;