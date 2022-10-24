import { prisma } from "src/graphql/prisma";
import { NextApiRequest } from "next";
import { loadIdToken } from "src/auth/firebaseAdmin";
import { Context } from "src/types/Context";

export async function createContext({
  req,
}: {
  req: NextApiRequest;
}): Promise<Context> {
  const userId = await loadIdToken(req);

  return {
    userId,
    prisma,
  };
}
