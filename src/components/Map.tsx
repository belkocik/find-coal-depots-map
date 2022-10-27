import { useRef } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import ReactMapGL, { ViewState } from "react-map-gl";
import { useLocalState } from "src/hooks/useLocalState";

interface IProps {
  setDataBounds: (bounds: string) => void;
}

const Mapbox = ({ setDataBounds }: IProps) => {
  const mapRef = useRef<ReactMapGL | null>(null);
  const [viewport, setViewport] = useLocalState<ViewState>("viewport", {
    latitude: 51.759445,
    longitude: 19.457216,
    zoom: 8,
  });

  return (
    <div className="text-black relative">
      <ReactMapGL
        {...viewport}
        width="100%"
        height="calc(100vh - 64px)"
        mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        minZoom={5.5}
        maxZoom={15}
        ref={(instance) => (mapRef.current = instance)}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        onLoad={() => {
          if (mapRef.current) {
            const bounds = mapRef.current.getMap().getBounds();
            setDataBounds(JSON.stringify(bounds.toArray()));
          }
        }}
        onInteractionStateChange={(extraInfo) => {
          if (!extraInfo.isDragging && mapRef.current) {
            const bounds = mapRef.current.getMap().getBounds();
            setDataBounds(JSON.stringify(bounds.toArray()));
          }
        }}
      ></ReactMapGL>
    </div>
  );
};

export default Mapbox;
