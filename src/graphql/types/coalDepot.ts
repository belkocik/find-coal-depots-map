import {
  extendType,
  objectType,
  inputObjectType,
  nonNull,
  nullable,
} from "nexus";
import { createCoalDepotResolver } from "../resolvers/coalDepotResolver";

const CoordinateInput = inputObjectType({
  name: "coordinateInput",
  definition(t) {
    t.nonNull.float("latitude");
    t.nonNull.float("longitude");
  },
});

const CoalDepotInput = inputObjectType({
  name: "coalDepotInput",
  definition(t) {
    t.nonNull.string("address");
    t.field("coordinates", {
      type: nonNull(CoordinateInput),
    });
    t.nonNull.string("coalDepotName");
    t.nonNull.string("mobilePhone");
    t.nonNull.string("landline");
    t.nonNull.string("coalDescAndAmount");
    t.nonNull.string("image");
  },
});

const CoalDepot = objectType({
  name: "coalDepot",
  definition(t) {
    t.nonNull.id("id");
    t.nullable.string("userId");
    t.nonNull.float("latitude");
    t.nonNull.float("longitude");
    t.nonNull.string("coalDepotName");
    t.nonNull.string("mobilePhone");
    t.nonNull.string("landline");
    t.nonNull.string("coalDescAndAmount");
    t.nonNull.string("image");
    t.nonNull.string("publicId", {
      resolve: (root) => {
        const parts = root.image.split("/");
        return parts[parts.length - 1];
      },
    });
  },
});

export const createCoalDepot = extendType({
  type: "Mutation",
  definition: (t) => {
    t.field("createCoalDepot", {
      type: CoalDepot,
      args: { input: nullable(CoalDepotInput) },
      resolve: createCoalDepotResolver,
    });
  },
});
