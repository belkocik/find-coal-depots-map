import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <div className="max-h-screen w-full">
      <Head>
        <title>COAL-DEPOTS-MAP</title>
        <meta name="description" content="Find coal depots in Poland" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="text-xl">hi</h1>
    </div>
  );
};

export default Home;
