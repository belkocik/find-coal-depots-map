import { buildSchemaSync, Resolver, Query } from "type-graphql";
import { ImageResolver } from "./types/image";
import { CoalDepotResolver } from "./types/coalDepot";
import { authChecker } from "./auth";

export const schema = buildSchemaSync({
  resolvers: [ImageResolver, CoalDepotResolver],
  emitSchemaFile: process.env.NODE_ENV === "development",
  authChecker,
});
