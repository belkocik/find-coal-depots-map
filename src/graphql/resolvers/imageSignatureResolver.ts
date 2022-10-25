import { FieldResolver } from "nexus";
const cloudinary = require("cloudinary").v2;
// import { getTokenCookie } from "src/auth/tokenCookies";

export const createImageSignatureResolver: FieldResolver<
  "Mutation",
  "createImageSignature"
> = (uid, prisma) => {
  // TODO: protect resolver
  console.log("prisma", prisma);
  console.log("uid from imagesignautre resolver:", uid);
  const timestamp = Math.round(new Date().getTime() / 1000);
  const signature: string = cloudinary.utils.api_sign_request(
    {
      timestamp,
    },
    process.env.CLOUDINARY_SECRET
  );
  return { timestamp, signature };
};
