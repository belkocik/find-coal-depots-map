import { useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import ReactMapGL, { Marker, NavigationControl } from "react-map-gl";
import Link from "next/link";

interface ICoalDepot {
  id: string;
  latitude: number;
  longitude: number;
}

interface IProps {
  coalDepot: ICoalDepot;
  nearby: ICoalDepot[];
}

const SingleMap = ({ coalDepot, nearby }: IProps) => {
  const [viewport, setViewport] = useState({
    latitude: coalDepot.latitude,
    longitude: coalDepot.longitude,
    zoom: 13,
  });

  return (
    <div className="text-black ">
      <ReactMapGL
        {...viewport}
        width="100%"
        height="calc(100vh - 64px)"
        mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        minZoom={9}
        scrollZoom={false}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
      >
        <div className="absolute top-0 left-0 p-4 z-10">
          <NavigationControl showCompass={false} />
        </div>
        <Marker
          latitude={coalDepot.latitude}
          longitude={coalDepot.longitude}
          offsetLeft={-15}
          offsetTop={-15}
        >
          <button>
            <img
              src="/coal-icon-logo.png"
              alt="selected coal depot"
              className="w-10"
            />
          </button>
        </Marker>

        {nearby.map((nearCoalDepot) => (
          <Marker
            key={nearCoalDepot.id}
            latitude={nearCoalDepot.latitude}
            longitude={nearCoalDepot.longitude}
            offsetLeft={-15}
            offsetTop={-15}
          >
            <Link href={`/coal-depots/${nearCoalDepot.id}`}>
              <a>
                <img
                  src="/coal-icon-logo-black.png"
                  alt="nearby coal depot"
                  className="w-10"
                />
              </a>
            </Link>
          </Marker>
        ))}
      </ReactMapGL>
    </div>
  );
};

export default SingleMap;
