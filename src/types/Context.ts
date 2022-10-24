import { PrismaClient } from "src/graphql/prisma";

export interface Context {
  userId: string | null;
  prisma: PrismaClient;
}

export interface AuthorizedContext extends Context {
  userId: string;
}
