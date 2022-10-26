import { FieldResolver } from "nexus";

export const createCoalDepotResolver: FieldResolver<
  "Mutation",
  "createCoalDepot"
> = async (_, { input }, { uid, prisma }) => {
  if (!uid) {
    throw new Error("You need to be logged in to perform an action");
  }

  const newCoalDepot = await prisma.coalDepot.create({
    data: {
      address: input.address,
      image: input.image,
      latitude: input.coordinates?.latitude,
      longitude: input.coordinates?.longitude,
      coalDepotName: input.coalDepotName,
      mobilePhone: input.mobilePhone,
      landline: input.landline,
      coalDescAndAmount: input.coalDescAndAmount,
      userId: "xd",
    },
  });

  return {
    newCoalDepot,
  };
};
