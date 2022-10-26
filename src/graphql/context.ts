import { PrismaClient } from "@prisma/client";

export interface Context {
  uid: string | null;
  prisma: PrismaClient;
}

export interface AuthorizedContext extends Context {
  uid: string;
}
