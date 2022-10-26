import React from "react";
import {
  AdvancedImage,
  lazyload,
  responsive,
  accessibility,
  placeholder,
} from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
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

  console.log(coalDepot);

  const cld = new Cloudinary({
    cloud: {
      cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    },
  });

  const myImage = cld.image(coalDepot.publicId);

  return (
    <div className="sm:block md:flex">
      <div className="sm:w-full md:w-1/2 p-4 ">
        <h1 className="text-3xl my-2 font-bold ">{coalDepot.address}</h1>
        <AdvancedImage
          cldImg={myImage}
          width={900}
          height={Math.floor((9 / 16) * 900)}
          plugins={[lazyload(), responsive(), placeholder({ mode: "blur" })]}
          className="rounded-lg"
        />
        <div className="text-xl font-semibold mt-2">
          <h2>
            <span className="text-span">Nazwa składu: </span>{" "}
            {coalDepot.coalDepotName}
          </h2>
          <h3>
            <span className="text-span"> Numer komórki: </span>

            {coalDepot.mobilePhone === "" ? "❌" : coalDepot.mobilePhone}
          </h3>
          <h3>
            <span className="text-span">Numer stacjonarny: </span>
            {coalDepot.landline === "" ? "❌" : coalDepot.landline}
          </h3>
          <h3>
            <span className="text-span">
              Ilość opału dostepnęgo na składzie:{" "}
            </span>
            {coalDepot.coalDescAndAmount}
          </h3>
          <table className="border-separate border border-slate-500 w-full text-center">
            <thead>
              <tr>
                <th className="border border-slate-600 ">Rodzaj węgla</th>
                <th className="border border-slate-600 ">Dostępna ilość</th>
                <th className="border border-slate-600 ">Cena [zł/tony]</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-slate-700 ">
                  Węgiel kostka/orzech/kęsy
                </td>
                <td className="border border-slate-700 ">2 tony</td>
                <td className="border border-slate-700 ">3500</td>
              </tr>
              <tr>
                <td className="border border-slate-700 ">
                  Węgiel grysik/groszek/ekogroszek
                </td>
                <td className="border border-slate-700 ">2 tony</td>
                <td className="border border-slate-700 ">3000</td>
              </tr>
              <tr>
                <td className="border border-slate-700 ">Węgiel miał</td>
                <td className="border border-slate-700 ">2 tony</td>
                <td className="border border-slate-700 ">2500</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="sm:w-full md:w-1/2">
        <SingleMap coalDepot={coalDepot} />
      </div>
    </div>
  );
};
