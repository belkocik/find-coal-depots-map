import { FieldResolver } from "nexus";

export const createCoalDepotResolver: FieldResolver<
  "Mutation",
  "createCoalDepot"
> = async (_, { input }, { uid, prisma }) => {
  const newCoalDepot = await prisma.coalDepot.create({
    data: {
      address: input.address,
      image: input.image,
      latitude: input.coordinates?.latitude,
      longitude: input.coordinates?.longitude,
      coalDepotName: input.coalDepotName,
      // userId: uid,
    },
  });
};
