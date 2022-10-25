import { PrismaClient } from "src/graphql/prisma";

export interface Context {
  uid: string | null;
  prisma: PrismaClient;
}

export interface AuthorizedContext extends Context {
  uid: string;
}
