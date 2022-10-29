import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage, lazyload, responsive } from "@cloudinary/react";
import Link from "next/link";
import React from "react";

interface CoalDepot {
  id: string;
  latitude: number;
  longitude: number;
  address: string;
  publicId: string;
  coalDepotName: string;
}

interface IProps {
  coalDepots: CoalDepot[];
  setHighligtedId: (id: string | null) => void;
}

const CoalDepotsList = ({ coalDepots, setHighligtedId }: IProps) => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    },
  });

  return (
    <>
      {coalDepots.map((coalDepot) => (
        <Link href={`/coal-depots/${coalDepot.id}`} key={coalDepot.id}>
          <div
            className="mx-1 md:mx-2 mt-2 cursor-pointer flex flex-col"
            onMouseEnter={() => setHighligtedId(coalDepot.id)}
            onMouseLeave={() => setHighligtedId(null)}
          >
            <div className="bg-nav flex flex-col md:flex-row p-1 md:p-4 rounded-lg ">
              <div className="sm:w-full md:w-1/2  ">
                <AdvancedImage
                  cldImg={cld.image(coalDepot.publicId)}
                  plugins={[lazyload(), responsive()]}
                  className="rounded-lg w-80 h-56 object-cover"
                />
              </div>
              <div className="sm:w-full md:w-1/2 sm:pl-0 md:pl-4 flex flex-col justify-center p-2 text-center md:text-left ">
                <h2 className="text-sm md:text-xl font-bold ">
                  {coalDepot.address}
                </h2>
                <h3 className="text-sm md:text-lg font-semibold">
                  {coalDepot.coalDepotName}
                </h3>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
};

export default CoalDepotsList;
