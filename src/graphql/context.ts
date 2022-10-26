import prisma from "./prisma";
import { NextApiRequest } from "next";
import { loadIdToken } from "src/auth/firebaseAdmin";
import { Context, AuthorizedContext } from "src/types/Context";
import { getAuth } from "firebase/auth";

export async function createContext({
  req,
}: {
  req: NextApiRequest;
}): Promise<Context> {
  const uid = await loadIdToken(req);

  // console.log("it is userId from context.ts", uid);

  const user = getAuth();
  if (user.currentUser?.uid === null) {
    console.log("user not logged in");
    return { prisma };
  }

  return {
    uid,
    prisma,
  };
}
