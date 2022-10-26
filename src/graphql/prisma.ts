import { PrismaClient } from "@prisma/client";

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

let prisma =
  global.prisma ||
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development" ? ["query", "info", "warn"] : [],
  });

if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export default prisma;
