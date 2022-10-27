import { useGetCoalDepotsFromBoundsQuery } from "generated/graphql";
import type { NextPage } from "next";
import Head from "next/head";
import Mapbox from "src/components/Map";
import { useLocalState } from "src/hooks/useLocalState";
import { useDebounce } from "use-debounce";
import { useLastData } from "src/hooks/useLastData";
import CoalDepotsList from "src/components/CoalDepotsList";

type BoundsArray = [[number, number], [number, number]];

const parseBounds = (boundsString: string) => {
  const bounds = JSON.parse(boundsString) as BoundsArray;
  return {
    sw: {
      latitude: bounds[0][1],
      longitude: bounds[0][0],
    },
    ne: {
      latitude: bounds[1][1],
      longitude: bounds[1][0],
    },
  };
};

const Home: NextPage = () => {
  const [dataBounds, setDataBounds] = useLocalState<string>(
    "bounds",
    "[[0,0][0,0]]"
  );

  const [debouncedDataBounds] = useDebounce(dataBounds, 400);

  const { data, error } = useGetCoalDepotsFromBoundsQuery({
    variables: {
      bounds: parseBounds(debouncedDataBounds),
    },
  });
  const lastData = useLastData(data);

  if (error) return <p>Wystąpił błąd podczas ładowania.</p>;

  return (
    <div className="max-h-screen w-full ">
      <Head>
        <title>COAL-DEPOTS-MAP</title>
        <meta name="description" content="Find coal depots in Poland" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex ">
        <div
          className="w-1/2 pb-4 p-2"
          style={{ maxHeight: "calc(100vh - 64px)", overflowX: "scroll" }}
        >
          <CoalDepotsList coalDepots={lastData ? lastData.coalDepots : []} />
        </div>
        <div className="w-1/2">
          <Mapbox
            setDataBounds={setDataBounds}
            coalDepots={lastData ? lastData.coalDepots : []}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
