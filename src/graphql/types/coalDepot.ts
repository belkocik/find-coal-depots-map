import {
  ObjectType,
  InputType,
  Field,
  ID,
  Float,
  Int,
  Resolver,
  Query,
  Mutation,
  Arg,
  Ctx,
  Authorized,
} from "type-graphql";
import { Min, Max } from "class-validator";
import { getBoundsOfDistance } from "geolib";
import type { Context, AuthorizedContext } from "src/graphql/context";

@InputType()
class CoordinatesInput {
  @Min(-90)
  @Max(90)
  @Field((_type) => Float)
  latitude!: number;

  @Min(-180)
  @Max(180)
  @Field((_type) => Float)
  longitude!: number;
}

@InputType()
class CoalDepotInput {
  @Field((_type) => String)
  address!: string;

  @Field((_type) => String)
  image!: string;

  @Field((_type) => CoordinatesInput)
  coordinates!: CoordinatesInput;

  @Field((_type) => String)
  coalDepotName!: string;

  @Field((_type) => String)
  mobilePhone!: string;

  @Field((_type) => String)
  landline!: string;

  @Field((_type) => String)
  coalDescAndAmount!: string;
}

@ObjectType()
class CoalDepot {
  @Field((_type) => ID)
  id!: number;

  @Field((_type) => String)
  userId!: string;

  @Field((_type) => Float)
  latitude!: number;

  @Field((_type) => Float)
  longitude!: number;

  @Field((_type) => String)
  address!: string;

  @Field((_type) => String)
  image!: string;

  @Field((_type) => String)
  publicId(): string {
    const parts = this.image.split("/");
    return parts[parts.length - 1];
  }

  @Field((_type) => String)
  coalDepotName!: string;

  @Field((_type) => String)
  mobilePhone!: string;

  @Field((_type) => String)
  landline!: string;

  @Field((_type) => String)
  coalDescAndAmount!: string;
}

@Resolver()
export class CoalDepotResolver {
  @Authorized()
  @Mutation((_returns) => CoalDepot, { nullable: true })
  async createCoalDepot(
    @Arg("input") input: CoalDepotInput,
    @Ctx() ctx: AuthorizedContext
  ) {
    return await ctx.prisma.coalDepot.create({
      data: {
        userId: ctx.uid,
        address: input.address,
        image: input.image,
        latitude: input.coordinates.latitude,
        longitude: input.coordinates.longitude,
        coalDepotName: input.coalDepotName,
        mobilePhone: input.mobilePhone,
        landline: input.landline,
        coalDescAndAmount: input.coalDescAndAmount,
      },
    });
  }
}
