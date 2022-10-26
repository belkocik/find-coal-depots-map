import { useRef, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxMap, { Marker, NavigationControl, ViewState } from "react-map-gl";
import Link from "next/link";
import { CoalDepot } from "../../generated/graphql";

interface ICoalDepot {
  id: string;
  latitude: number;
  longitude: number;
}

interface IProps {
  coalDepot: ICoalDepot;
}

const SingleMap = ({ coalDepot }: IProps) => {
  const [viewport, setViewport] = useState<ViewState>({
    latitude: coalDepot.latitude,
    longitude: coalDepot.longitude,
    zoom: 13,
    bearing: 0,
    pitch: 0,
    padding: { left: 0, right: 0, top: 0, bottom: 0 },
  });

  return (
    <div className="text-black">
      <MapboxMap
        style={{ width: "100%", height: "calc(100vh - 64px)" }}
        initialViewState={{
          ...viewport,
        }}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        minZoom={9}
        maxZoom={15}
        scrollZoom={false}
      >
        <NavigationControl showCompass={false} position="top-left" />
        <Marker
          latitude={coalDepot.latitude}
          longitude={coalDepot.longitude}
          offset={[-15, -15]}
        >
          <button>
            <img src="/coal-icon-logo.png" alt="selected coal depot" />
          </button>
        </Marker>
      </MapboxMap>
    </div>
  );
};

export default SingleMap;
