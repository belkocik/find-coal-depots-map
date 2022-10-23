import React from "react";
import FirebaseAuth from "src/components/FirebaseAuth";
import { GetServerSideProps, NextApiRequest } from "next";
import { loadIdToken } from "src/auth/firebaseAdmin";

const Auth = () => {
  return (
    <div className="p-2">
      <FirebaseAuth />
    </div>
  );
};

export default Auth;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const uid = await loadIdToken(req as NextApiRequest);

  if (uid) {
    res.setHeader("location", "/");
    res.statusCode = 302;
    res.end();
  }

  return { props: {} };
};
