import type { NextPage } from "next";
import Head from "next/head";
import Mapbox from "src/components/Map";

const Home: NextPage = () => {
  return (
    <div className="max-h-screen w-full">
      <Head>
        <title>COAL-DEPOTS-MAP</title>
        <meta name="description" content="Find coal depots in Poland" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex">
        <div className="w-1/2 pb-4">depots list</div>
        <div className="w-1/2">
          <Mapbox />
        </div>
      </div>
    </div>
  );
};

export default Home;
