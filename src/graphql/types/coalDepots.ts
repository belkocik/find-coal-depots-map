import { extendType, objectType, nonNull } from "nexus";
import { createImageSignatureResolver } from "../resolvers/imageSignatureResolver";

export const createImageSignature = extendType({
  type: "Mutation",
  definition: (t) => {
    t.field("createImageSignature", {
      type: nonNull(imageSignature),
      resolve: createImageSignatureResolver,
    });
  },
});

const imageSignature = objectType({
  name: "imageSignature",
  definition: (t) => {
    t.nonNull.string("signature");
    t.nonNull.int("timestamp");
  },
});
