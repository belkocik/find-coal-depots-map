import { Prisma, PrismaClient } from "@prisma/client";

const prisma: PrismaClient = new PrismaClient({
  log: process.env.NODE_ENV === "development" ? ["query", "info", "warn"] : [],
});

export { prisma, PrismaClient };
