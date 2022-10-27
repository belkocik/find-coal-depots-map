import type { NextPage } from "next";
import Head from "next/head";
import Mapbox from "src/components/Map";
import { useLocalState } from "src/hooks/useLocalState";
import { useDebounce } from "use-debounce";

type BoundsArray = [[number, number], [number, number]];

const Home: NextPage = () => {
  const [dataBounds, setDataBounds] = useLocalState<string>(
    "bounds",
    "[[0,0][0,0]]"
  );

  const [debouncedDataBounds] = useDebounce(dataBounds, 400);

  return (
    <div className="max-h-screen w-full ">
      <Head>
        <title>COAL-DEPOTS-MAP</title>
        <meta name="description" content="Find coal depots in Poland" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex">
        <div className="w-1/2 pb-4 p-2">depots list</div>
        <div className="w-1/2">
          <Mapbox setDataBounds={setDataBounds} />
        </div>
      </div>
    </div>
  );
};

export default Home;
