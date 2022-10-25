import * as admin from "firebase-admin";
import { NextApiRequest } from "next";

const verifyIdToken = (token: string) => {
  const firebasePrivateKey: string = process.env.FIREBASE_PRIVATE_KEY ?? ""; // ?? if nullish return empty string ""
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: firebasePrivateKey.replace(/\\n/g, "\n"),
      }),
    });
  }

  return admin
    .auth()
    .verifyIdToken(token)
    .catch(() => {
      console.log("token is not valid");
      return null;
    }); // if token is not valid);
};

export const loadIdToken = async (
  req: NextApiRequest
): Promise<string | null> => {
  if (!req.cookies.token) return null; // user is not logged in

  const decoded = await verifyIdToken(req.cookies.token);
  if (!decoded) return null; // user is not authenticated
  return decoded.uid; // user token is valid
};
