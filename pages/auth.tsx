import React from "react";
import FirebaseAuth from "src/components/FirebaseAuth";
import { GetServerSideProps, NextApiRequest } from "next";
import { loadIdToken } from "src/auth/firebaseAdmin";
import Head from "next/head";

const Auth = () => {
  return (
    <div className="p-2">
      <Head>
        <title>Zaloguj/Zarejestruj się do aplikacji</title>
        <meta
          name="description"
          content=" Zaloguj/Zarejestruj się do aplikacji - Mapa składów węgla/opału w Polsce"
        />
      </Head>
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
