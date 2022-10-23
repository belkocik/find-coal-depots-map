import { useRef, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxMap, { ViewState, MapRef } from "react-map-gl";

interface IProps {}

const Mapbox = ({}: IProps) => {
  const mapRef = useRef<MapRef | null>(null);
  const [viewport, setViewport] = useState<ViewState>({
    latitude: 51.759445,
    longitude: 19.457216,
    zoom: 8,
    bearing: 0,
    pitch: 0,
    padding: { left: 0, right: 0, top: 0, bottom: 0 },
  });

  return (
    <div className="text-black relative">
      <MapboxMap
        style={{ width: "100%", height: "calc(100vh - 64px)" }}
        initialViewState={{
          ...viewport,
        }}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        minZoom={5.5}
        maxZoom={15}
        ref={(instance) => (mapRef.current = instance)}
      ></MapboxMap>
    </div>
  );
};

export default Mapbox;
