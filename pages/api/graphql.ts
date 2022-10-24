// import { NextApiRequest, NextApiResponse } from "next";
import "reflect-metadata";
import Cors from "micro-cors";
import { ApolloServer } from "apollo-server-micro";
import { schema } from "src/graphql/schema";
import { createContext } from "src/graphql/context";

export const config = {
  api: {
    bodyParser: false,
  },
};

const cors = Cors();

const apolloServer = new ApolloServer({
  schema,
  context: createContext,
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
