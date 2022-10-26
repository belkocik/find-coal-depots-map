import {
  useCreateImageSignatureMutation,
  useCreateCoalDepotMutation,
} from "generated/graphql";
import Link from "next/link";
import { useState, useEffect, ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import SearchBox from "./SearchBox";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";

interface IUploadImageResponse {
  secure_url: string;
}

async function uploadImage(
  image: File,
  signature: string,
  timestamp: number
): Promise<IUploadImageResponse> {
  const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`;

  const formData = new FormData();
  formData.append("file", image);
  formData.append("signature", signature);
  formData.append("timestamp", timestamp.toString());
  formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_KEY ?? "");

  const response = await fetch(url, {
    method: "post",
    body: formData,
  });
  return response.json();
}
interface IFormData {
  address: string;
  latitude: number;
  longitude: number;
  coalDepotName: string;
  mobilePhone: string;
  landline: string;
  thickCoal: string;
  mediumCoal: string;
  smallCoal: string;
  thickCoalPrice: string;
  mediumCoalPrice: string;
  smallCoalPrice: string;
  image: FileList;
}

interface IProps {}

const CoalDepotForm = ({}: IProps) => {
  const [submitting, setSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>();
  const { register, handleSubmit, setValue, watch, errors } =
    useForm<IFormData>({
      defaultValues: {},
    });

  const router = useRouter();
  useEffect(() => {
    register({ name: "address" }, { required: "Dodaj adres składu opału" });
    register({ name: "latitude" }, { required: true, min: -90, max: 90 });
    register({ name: "longitude" }, { required: true, min: -180, max: 180 });
  }, [register]);

  const [createSignatureMutation] = useCreateImageSignatureMutation();
  const [createCoalDepotMutation] = useCreateCoalDepotMutation();

  const handleCreate = async (data: IFormData) => {
    const { data: signatureData } = await createSignatureMutation();
    if (signatureData) {
      const { timestamp, signature } = signatureData.createImageSignature;
      const imageData = await uploadImage(data.image[0], signature, timestamp);
      const { data: coalDepotData } = await createCoalDepotMutation({
        variables: {
          input: {
            address: data.address,
            image: imageData.secure_url,
            coordinates: {
              latitude: data.latitude,
              longitude: data.longitude,
            },
            coalDepotName: data.coalDepotName,
            landline: data.landline,
            mobilePhone: data.mobilePhone,
            smallCoal: parseInt(data.smallCoal, 10),
            smallCoalPrice: parseInt(data.smallCoalPrice, 10),
            mediumCoal: parseInt(data.mediumCoal, 10),
            mediumCoalPrice: parseInt(data.mediumCoalPrice, 10),
            thickCoal: parseInt(data.thickCoal, 10),
            thickCoalPrice: parseInt(data.thickCoalPrice, 10),
          },
        },
      });

      if (coalDepotData?.createCoalDepot) {
        router.push(`/coal-depots/${coalDepotData.createCoalDepot.id}`);
      } else {
        toast.error("Wystąpił błąd podczas dodawania składu opału.", {
          duration: 6000,
          icon: "🚫",
        });
      }
    }
  };

  const address = watch("address");

  const onSubmit = (data: IFormData) => {
    setSubmitting(true);
    handleCreate(data);
  };

  return (
    <form className="mx-auto max-w-2xl py-4" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-xl font-semibold">Dodaj nowy skład węgla/opału</h1>

      <div className="mt-4">
        <label htmlFor="search" className="block">
          Wyszukaj adres
        </label>
        {/* {Search field} */}
        <SearchBox
          onSelectAddress={(address, latitude, longitude) => {
            setValue("address", address);
            setValue("latitude", latitude);
            setValue("longitude", longitude);
          }}
          defaultValue=""
        />
        {errors.address ? (
          <p className="text-red-600">▲ {errors.address.message} ▲</p>
        ) : null}
      </div>
      {address ? (
        <>
          <div className="mt-4 ">
            <label
              htmlFor="image"
              className="p-4 border-dashed border-4 border-nav block cursor-pointer"
            >
              Kliknij aby dodać zdjęcie (16:9)
            </label>
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              ref={register({
                validate: (fileList: FileList) => {
                  if (fileList.length === 1) return true;
                  return "Dodaj tylko jedno zdjęcie";
                },
              })}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                if (event?.target?.files?.[0]) {
                  const file = event.target.files[0];
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setPreviewImage(reader.result as string);
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
            {previewImage ? (
              <img
                src={previewImage}
                className="mt-4 object-fill"
                style={{ width: "100vw", height: `${(9 / 16) * 576}px` }}
              />
            ) : null}
            {errors.image ? (
              <p className="text-red-600">▲ {errors.image.message} ▲</p>
            ) : null}
          </div>

          <div className="mt-4 ">
            <label htmlFor="coalDepotName" className="block font-semibold">
              Nazwa składu
            </label>
            <input
              type="text"
              id="coalDepotName"
              name="coalDepotName"
              className="p-2 w-full"
              ref={register({
                required: "Wpisz nazwę składu z węglem/opałem",
                maxLength: { message: "Maksymalnie 50 znaków", value: 50 },
              })}
            />
            {errors.coalDepotName ? (
              <p className="text-red-600">▲ {errors.coalDepotName.message} ▲</p>
            ) : null}
          </div>

          <div className="mt-4 ">
            <label htmlFor="mobilePhone" className="block font-semibold">
              Numer telefonu komórkowego do właściciela składu
            </label>
            <input
              type="text"
              id="mobilePhone"
              name="mobilePhone"
              className="p-2 w-full"
              ref={register({
                // required: "Wpisz telefon komórkowy do właściciela składu",
                maxLength: { message: "Numer telefonu ma 9 cyfr!", value: 9 },
                minLength: { message: "Numer telefonu ma 9 cyfr!", value: 9 },
              })}
            />
            {errors.mobilePhone ? (
              <p className="text-red-600">▲ {errors.mobilePhone.message} ▲</p>
            ) : null}
          </div>

          <div className="mt-4 ">
            <label htmlFor="landline" className="block font-semibold">
              Numer telefonu stacjonarnego do właściciela składu
            </label>
            <input
              type="text"
              id="landline"
              name="landline"
              className="p-2 w-full"
              ref={register({
                // required: "Wpisz telefon komórkowy do właściciela składu",
                maxLength: {
                  message: "Numer stacjonarny ma 9 cyfr!",
                  value: 9,
                },
                minLength: {
                  message: "Numer stacjonarny ma 9 cyfr!",
                  value: 9,
                },
              })}
            />
            {errors.landline ? (
              <p className="text-red-600">▲ {errors.landline.message} ▲</p>
            ) : null}
          </div>

          <h2 className="text-xl mt-2 md:mt-4 font-semibold">
            Dostępna ilość węgla
          </h2>
          <div className="flex flex-col w-full md:flex-row justify-center mt-2 md:gap-6 text-center">
            <div className="mt-2 md:mt-4">
              <label htmlFor="thickCoal" className="block font-semibold">
                Węgiel kostka/orzech/kęsy [t]
              </label>
              <input
                type="number"
                id="thickCoal"
                name="thickCoal"
                placeholder="10"
                className="p-2  w-20 md:w-60"
                ref={register({
                  required: "Podaj ilość węgla",
                  max: {
                    value: 999,
                    message: "Za duża ilość",
                  },
                  min: {
                    value: 0,
                    message: "Podałeś zlą liczbę z dostępnego zakresu",
                  },
                })}
              />
              {errors.thickCoal ? (
                <p className="text-red-600">▲ {errors.thickCoal.message} ▲</p>
              ) : null}
            </div>

            <div className="mt-2 md:mt-4">
              <label htmlFor="thickCoalPrice" className="block font-semibold">
                Cena [zł]
              </label>
              <input
                type="number"
                id="thickCoalPrice"
                name="thickCoalPrice"
                placeholder="1000"
                className="p-2 w-20 md:w-60"
                ref={register({
                  required: "Podaj cenę węgla",
                  max: {
                    value: 10000,
                    message: "Limit to 10 tyś złotych.",
                  },
                  min: {
                    value: 0,
                    message: "Podałeś zlą liczbę z dostępnego zakresu",
                  },
                })}
              />
              {errors.thickCoalPrice ? (
                <p className="text-red-600">
                  ▲ {errors.thickCoalPrice.message} ▲
                </p>
              ) : null}
            </div>
          </div>

          <div className="flex flex-col w-full md:flex-row justify-center mt-6 md:gap-6 text-center">
            <div className="mt-2 md:mt-4 ">
              <label htmlFor="mediumCoal" className="block font-semibold ">
                Węgiel grysik/groszek/ekogroszek
              </label>
              <input
                type="number"
                id="mediumCoal"
                name="mediumCoal"
                placeholder="10"
                className="p-2 w-20 md:w-60"
                ref={register({
                  required: "Podaj ilość węgla",
                  max: {
                    value: 999,
                    message: "Za duża ilość",
                  },
                  min: {
                    value: 0,
                    message: "Podałeś zlą liczbę z dostępnego zakresu",
                  },
                })}
              />
              {errors.mediumCoal ? (
                <p className="text-red-600">▲ {errors.mediumCoal.message} ▲</p>
              ) : null}
            </div>

            <div className="md:mt-4">
              <label htmlFor="mediumCoalPrice" className="block font-semibold">
                Cena [zł]
              </label>
              <input
                type="number"
                id="mediumCoalPrice"
                name="mediumCoalPrice"
                placeholder="1000"
                className="p-2  w-20 md:w-60"
                ref={register({
                  required: "Podaj cenę węgla",
                  max: {
                    value: 10000,
                    message: "Limit to 10 tyś złotych.",
                  },
                  min: {
                    value: 0,
                    message: "Podałeś zlą liczbę z dostępnego zakresu",
                  },
                })}
              />
              {errors.mediumCoalPrice ? (
                <p className="text-red-600">
                  ▲ {errors.mediumCoalPrice.message} ▲
                </p>
              ) : null}
            </div>
          </div>
          <div className="flex flex-col w-full md:flex-row justify-center mt-6 md:gap-6 text-center">
            <div className="md:mt-4">
              <label htmlFor="smallCoal" className="block font-semibold">
                Węgiel miał
              </label>
              <input
                type="number"
                id="smallCoal"
                name="smallCoal"
                placeholder="10"
                className="p-2 w-20 md:w-60"
                ref={register({
                  required: "Podaj ilość węgla",
                  max: {
                    value: 999,
                    message: "Za duża ilość",
                  },
                  min: {
                    value: 0,
                    message: "Podałeś zlą liczbę z dostępnego zakresu",
                  },
                })}
              />
              {errors.smallCoal ? (
                <p className="text-red-600">▲ {errors.smallCoal.message} ▲</p>
              ) : null}
            </div>
            <div className="md:mt-4">
              <label htmlFor="smallCoalPrice" className="block font-semibold">
                Cena [zł]
              </label>
              <input
                type="number"
                id="smallCoalPrice"
                name="smallCoalPrice"
                placeholder="1000"
                className="p-2  w-20 md:w-60"
                ref={register({
                  required: "Podaj cenę węgla",
                  max: {
                    value: 10000,
                    message: "Limit to 10 tyś złotych.",
                  },
                  min: {
                    value: 0,
                    message: "Podałeś zlą liczbę z dostępnego zakresu",
                  },
                })}
              />
              {errors.smallCoalPrice ? (
                <p className="text-red-600">
                  ▲ {errors.smallCoalPrice.message} ▲
                </p>
              ) : null}
            </div>
          </div>

          <div className="mt-4 flex text-center justify-center items-center">
            <button
              className="bg-nav hover:bg-navHover font-bold py-2 px-6 rounded "
              type="submit"
              disabled={submitting}
            >
              Wyślij
            </button>{" "}
            <Link href="/">
              <a className="ml-4">Anuluj</a>
            </Link>
          </div>
        </>
      ) : null}
    </form>
  );
};

export default CoalDepotForm;
