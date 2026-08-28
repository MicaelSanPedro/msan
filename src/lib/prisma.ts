// @ts-nocheck
let PrismaClient: any;
try {
  ({ PrismaClient } = require("@prisma/client"));
} catch {
  // Prisma client not available (e.g. Vercel build without DB)
}

const globalForPrisma = globalThis as unknown as { prisma: any };

const dbUrl = process.env.DATABASE_URL || "file:/tmp/nimchat.db";

export const prisma =
  globalForPrisma.prisma ||
  (PrismaClient
    ? new PrismaClient({
        datasourceUrl: dbUrl,
        log: process.env.NODE_ENV === "development" ? ["error"] : [],
      })
    : null);

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
