import React from "react";
import { GetServerSideProps, NextApiRequest } from "next";
import { loadIdToken } from "src/auth/firebaseAdmin";
import CoalDepotForm from "../../src/components/CoalDepotForm";
import Head from "next/head";

const AddCoalDepot = () => {
  return (
    <div className="p-2">
      <Head>
        <title>Dodaj skład opału</title>
        <meta
          name="description"
          content=" Dodaj skład opału - Mapa składów węgla/opału w Polsce"
        />
      </Head>
      <CoalDepotForm />
    </div>
  );
};

export default AddCoalDepot;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const uid = await loadIdToken(req as NextApiRequest);

  if (!uid) {
    res.setHeader("location", "/auth");
    res.statusCode = 302;
    res.end();
  }

  return { props: {} };
};
