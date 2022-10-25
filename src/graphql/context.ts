import { prisma } from "src/graphql/prisma";
import { NextApiRequest } from "next";
import { loadIdToken } from "src/auth/firebaseAdmin";
import { Context } from "src/types/Context";

export async function createContext({
  req,
}: {
  req: NextApiRequest;
}): Promise<Context> {
  const uid = await loadIdToken(req);
  console.log("it is userId from context.ts", uid);
  return {
    uid,
    prisma,
  };
}
