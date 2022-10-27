import { useRef, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import ReactMapGL, { ViewState, Marker, Popup } from "react-map-gl";
import { useLocalState } from "src/hooks/useLocalState";
import { AdvancedImage, lazyload, responsive } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import Link from "next/link";
import { SearchBox } from "src/components/SearchBox";

interface CoalDepot {
  id: string;
  latitude: number;
  longitude: number;
  address: string;
  publicId: string;
  coalDepotName: string;
}

interface IProps {
  setDataBounds: (bounds: string) => void;
  coalDepots: CoalDepot[];
  highligtedId: string | null;
}

const Mapbox = ({ setDataBounds, coalDepots, highligtedId }: IProps) => {
  const [over, setOver] = useState<string | null>(null);
  const [selected, setSelected] = useState<CoalDepot | null>(null);
  const mapRef = useRef<ReactMapGL | null>(null);
  const [viewport, setViewport] = useLocalState<ViewState>("viewport", {
    latitude: 51.759445,
    longitude: 19.457216,
    zoom: 10,
  });

  const cld = new Cloudinary({
    cloud: {
      cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    },
  });

  return (
    <div className="text-black relative">
      <ReactMapGL
        {...viewport}
        width="100%"
        height="calc(100vh - 64px)"
        mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        minZoom={6.5}
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
      >
        <div className="absolute top-0 w-full z-20 p-4">
          <SearchBox
            defaultValue=""
            onSelectAddress={(_address, latitude, longitude) => {
              if (latitude && longitude) {
                setViewport((old) => ({
                  ...old,
                  latitude,
                  longitude,
                  zoom: 12,
                }));
                if (mapRef.current) {
                  const bounds = mapRef.current.getMap().getBounds();
                  setDataBounds(JSON.stringify(bounds.toArray()));
                }
              }
            }}
          />
        </div>
        {coalDepots.map((coalDepot) => (
          <Marker
            key={coalDepot.id}
            latitude={coalDepot.latitude}
            longitude={coalDepot.longitude}
            offsetLeft={-15}
            offsetTop={-15}
            className={highligtedId === coalDepot.id ? "z-10" : ""}
          >
            <div
              onMouseEnter={() => setOver(coalDepot.id)}
              onMouseOut={() => setOver(null)}
            >
              <button type="button" onClick={() => setSelected(coalDepot)}>
                <img
                  src={
                    highligtedId === coalDepot.id || coalDepot.id === over
                      ? "/coal-icon-logo.png"
                      : "/coal-icon-logo-black.png"
                  }
                  alt="coal depot"
                  className="w-10 z-40"
                />
              </button>
            </div>
          </Marker>
        ))}
        {selected ? (
          <Popup
            latitude={selected.latitude}
            longitude={selected.longitude}
            onClose={() => setSelected(null)}
            closeOnClick={false}
            className="z-30"
          >
            <div className="text-center flex flex-col items-center">
              <h3 className="px-4 font-semibold">
                {selected.address.substring(0, 30)}
              </h3>
              <AdvancedImage
                cldImg={cld.image(selected.publicId)}
                plugins={[lazyload(), responsive()]}
                className="rounded-lg w-48 h-40"
              />
              <h3 className="font-semibold">{selected.coalDepotName}</h3>
              <Link href={`/coal-depots/${selected.id}`}>
                <button className="bg-transparent hover:bg-buttonHover text-black font-semibold hover:text-white  px-2 py-1 border border-button hover:border-transparent rounded">
                  Zobacz skład opału
                </button>
              </Link>
            </div>
          </Popup>
        ) : null}
      </ReactMapGL>
    </div>
  );
};

export default Mapbox;
