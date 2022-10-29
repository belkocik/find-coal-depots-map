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
class BoundsInput {
  @Field((_type) => CoordinatesInput)
  sw!: CoordinatesInput;

  @Field((_type) => CoordinatesInput)
  ne!: CoordinatesInput;
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

  @Field((_type) => Float)
  thickCoalAmount!: number;

  @Field((_type) => Float)
  thickCoalPrice!: number;

  @Field((_type) => Float)
  mediumCoalAmount!: number;

  @Field((_type) => Float)
  mediumCoalPrice!: number;

  @Field((_type) => Float)
  smallCoalAmount!: number;

  @Field((_type) => Float)
  smallCoalPrice!: number;
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

  @Field((_type) => Float)
  thickCoalAmount!: number;

  @Field((_type) => Float)
  thickCoalPrice!: number;

  @Field((_type) => Float)
  mediumCoalAmount!: number;

  @Field((_type) => Float)
  mediumCoalPrice!: number;

  @Field((_type) => Float)
  smallCoalAmount!: number;

  @Field((_type) => Float)
  smallCoalPrice!: number;

  @Field((_type) => [CoalDepot])
  async nearby(@Ctx() ctx: Context) {
    const bounds = getBoundsOfDistance(
      { latitude: this.latitude, longitude: this.longitude },
      10000
    );

    return ctx.prisma.coalDepot.findMany({
      where: {
        latitude: { gte: bounds[0].latitude, lte: bounds[1].latitude },
        longitude: { gte: bounds[0].longitude, lte: bounds[1].longitude },
        id: { not: { equals: this.id } },
      },
      take: 25,
    });
  }
}

@Resolver()
export class CoalDepotResolver {
  @Query((_returns) => CoalDepot, { nullable: true })
  async coalDepot(@Arg("id") id: string, @Ctx() ctx: Context) {
    return ctx.prisma.coalDepot.findFirst({ where: { id: parseInt(id, 10) } });
  }

  @Query((_returns) => [CoalDepot], { nullable: false })
  async coalDepots(@Arg("bounds") bounds: BoundsInput, @Ctx() ctx: Context) {
    return ctx.prisma.coalDepot.findMany({
      where: {
        latitude: { gte: bounds.sw.latitude, lte: bounds.ne.latitude },
        longitude: { gte: bounds.sw.longitude, lte: bounds.ne.longitude },
      },
      take: 50,
    });
  }

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
        mediumCoalAmount: input.mediumCoalAmount,
        thickCoalAmount: input.thickCoalAmount,
        smallCoalAmount: input.smallCoalAmount,
        smallCoalPrice: input.smallCoalPrice,
        mediumCoalPrice: input.mediumCoalPrice,
        thickCoalPrice: input.thickCoalPrice,
      },
    });
  }

  @Authorized()
  @Mutation((_returns) => CoalDepot, { nullable: true })
  async updateCoalDepot(
    @Arg("id") id: string,
    @Arg("input") input: CoalDepotInput,
    @Ctx() ctx: AuthorizedContext
  ) {
    const coalDepotId = parseInt(id, 10);
    const coalDepot = await prisma?.coalDepot.findUnique({
      where: { id: coalDepotId },
    });

    if (!coalDepot || coalDepot.userId !== ctx.uid) return null;

    return await ctx.prisma.coalDepot.update({
      where: {
        id: coalDepot.id,
      },
      data: {
        address: input.address,
        image: input.image,
        latitude: input.coordinates.latitude,
        longitude: input.coordinates.longitude,
        coalDepotName: input.coalDepotName,
        mobilePhone: input.mobilePhone,
        landline: input.landline,
        mediumCoalAmount: input.mediumCoalAmount,
        thickCoalAmount: input.thickCoalAmount,
        smallCoalAmount: input.smallCoalAmount,
        smallCoalPrice: input.smallCoalPrice,
        mediumCoalPrice: input.mediumCoalPrice,
        thickCoalPrice: input.thickCoalPrice,
      },
    });
  }

  @Authorized()
  @Mutation((_retruns) => Boolean, { nullable: false })
  async deleteCoalDepot(
    @Arg("id") id: string,
    @Ctx() ctx: AuthorizedContext
  ): Promise<boolean> {
    const coalDepotId = parseInt(id, 10);
    const coalDepot = await prisma?.coalDepot.findUnique({
      where: { id: coalDepotId },
    });

    if (!coalDepot || coalDepot.userId !== ctx.uid) return false;

    await ctx.prisma.coalDepot.delete({
      where: {
        id: coalDepotId,
      },
    });
    return true;
  }
}
