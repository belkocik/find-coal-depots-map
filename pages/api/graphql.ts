import "reflect-metadata";
import { NextApiRequest } from "next";
import Cors from "micro-cors";
import { ApolloServer } from "apollo-server-micro";
import { schema } from "src/graphql/schema";
import { loadIdToken } from "src/auth/firebaseAdmin";
import { Context } from "src/graphql/context";
import prisma from "src/graphql/prisma";

export const config = {
  api: {
    bodyParser: false,
  },
};

const cors = Cors();

const apolloServer = new ApolloServer({
  schema,
  context: async ({ req }: { req: NextApiRequest }): Promise<Context> => {
    const uid = await loadIdToken(req);

    return {
      uid,
      prisma,
    };
  },
});

const startServer = apolloServer.start();

export default cors(async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }

  await startServer;

  await apolloServer.createHandler({
    path: "/api/graphql",
  })(req, res);
});
