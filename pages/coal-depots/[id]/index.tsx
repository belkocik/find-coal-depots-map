import React from "react";
import {
  AdvancedImage,
  lazyload,
  responsive,
  placeholder,
} from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { useRouter } from "next/router";
import { useShowCoalDepotQuery } from "generated/graphql";
import SingleMap from "src/components/SingleMap";

const ShowCoalDepot = () => {
  const {
    query: { id },
  } = useRouter();

  if (!id) return null;

  return <CoalDepotData id={id as string} />;
};

export default ShowCoalDepot;

const CoalDepotData = ({ id }: { id: string }) => {
  const { data, loading } = useShowCoalDepotQuery({
    variables: { id },
  });

  if (loading || !data) return <p>Loading....</p>;
  if (!data.coalDepot) return <p>Nie udało sie załadowac składu opału</p>;

  const { coalDepot } = data;

  const cld = new Cloudinary({
    cloud: {
      cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    },
  });

  const myImage = cld.image(coalDepot.publicId);
  myImage.resize(fill().width(250).height(250));

  return (
    <div className="sm:block md:flex ">
      <div
        className="sm:w-full flex flex-col w-full items-center md:w-1/2 p-4 overflow-y "
        style={{ maxHeight: "calc(100vh - 64px)", overflowX: "scroll" }}
      >
        <h1 className="text-3xl my-2 font-bold text">{coalDepot.address}</h1>
        <AdvancedImage
          cldImg={myImage}
          plugins={[lazyload(), responsive(), placeholder({ mode: "blur" })]}
          className="rounded-lg"
          style={{ width: "900px", height: `${(9 / 16) * 900}px` }}
        />
        <div className="text-xl font-semibold mt-2">
          <h2>
            <span className="text-span">Nazwa składu: </span>{" "}
            {coalDepot.coalDepotName}
          </h2>
          <h3>
            <span className="text-span">Numer komórki: </span>

            {coalDepot.mobilePhone === "" ? "❌" : coalDepot.mobilePhone}
          </h3>
          <h3>
            <span className="text-span">Numer stacjonarny: </span>
            {coalDepot.landline === "" ? "❌" : coalDepot.landline}
          </h3>

          <table className="mt-2 border-separate  border border-slate-500 text-center rounded-lg text-sm md:text-lg w-full 4xl:w-[900px]">
            <thead className="bg-tableHead">
              <tr>
                <th className="border border-slate-600 ">Rodzaj węgla</th>
                <th className="border border-slate-600 ">Dostępna ilość</th>
                <th className="border border-slate-600 ">Cena [zł/tona]</th>
              </tr>
            </thead>
            <tbody className="bg-tableBody">
              <tr>
                <td className="border border-slate-700 ">
                  Węgiel kostka/orzech/kęsy
                </td>
                <td className="border border-slate-700 ">
                  {coalDepot.thickCoalAmount}t
                </td>
                <td className="border border-slate-700 ">
                  {coalDepot.thickCoalPrice}
                </td>
              </tr>
              <tr>
                <td className="border border-slate-700 ">
                  Węgiel grysik/groszek/ekogroszek
                </td>
                <td className="border border-slate-700 ">
                  {coalDepot.mediumCoalAmount}t
                </td>
                <td className="border border-slate-700 ">
                  {coalDepot.mediumCoalPrice}
                </td>
              </tr>
              <tr>
                <td className="border border-slate-700 ">Węgiel miał</td>
                <td className="border border-slate-700 ">
                  {coalDepot.smallCoalAmount}t
                </td>
                <td className="border border-slate-700 ">
                  {coalDepot.smallCoalPrice}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="sm:w-full md:w-1/2">
        <SingleMap coalDepot={coalDepot} nearby={coalDepot.nearby} />
      </div>
    </div>
  );
};
