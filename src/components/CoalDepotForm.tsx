import Link from "next/link";
import { useState, useEffect, ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import SearchBox from "./SearchBox";

interface IFormData {
  address: string;
  latitude: number;
  longitude: number;
  coalDepotName: string;
  mobilePhone: string;
  landline: string;
  coalDescAndAmount: string;
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

  useEffect(() => {
    register({ name: "address" }, { required: "Dodaj adres składu opału" });
    register({ name: "latitude" }, { required: true, min: -90, max: 90 });
    register({ name: "longitude" }, { required: true, min: -180, max: 180 });
  }, [register]);

  const handleCreate = async (data: IFormData) => {
    console.log({ data });
  };

  const address = watch("address");

  const onSubmit = (data: IFormData) => {
    setSubmitting(true);
    handleCreate(data);
  };

  return (
    <form
      action=""
      className="mx-auto max-w-xl py-4"
      onSubmit={handleSubmit(onSubmit)}
    >
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
                className="mt-4 object-cover"
                style={{ width: "576px", height: `${(9 / 16) * 576}px` }}
              />
            ) : null}
            {errors.image ? (
              <p className="text-red-600">▲ {errors.image.message} ▲</p>
            ) : null}
          </div>

          <div className="mt-4 ">
            <label htmlFor="coalDepotName" className="block">
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
            <label htmlFor="mobilePhone" className="block">
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
              })}
            />
            {errors.mobilePhone ? (
              <p className="text-red-600">▲ {errors.mobilePhone.message} ▲</p>
            ) : null}
          </div>

          <div className="mt-4 ">
            <label htmlFor="landline" className="block">
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
              })}
            />
            {errors.landline ? (
              <p className="text-red-600">▲ {errors.landline.message} ▲</p>
            ) : null}
          </div>

          <div className="mt-4 ">
            <label htmlFor="coalDescAndAmount" className="block">
              Ilość węgla dostepego na składzie [tony]
            </label>
            <input
              type="text"
              id="coalDescAndAmount"
              name="coalDescAndAmount"
              placeholder="węgiel 20t, ekogroszek 5t, miał: 7t, itd."
              className="p-2 w-full"
              ref={register({
                required: "Wpisz Ilość węgla dostepego na składzie",
                maxLength: { message: "Numer telefonu ma 9 znaków!", value: 9 },
              })}
            />
            {errors.coalDescAndAmount ? (
              <p className="text-red-600">
                ▲ {errors.coalDescAndAmount.message} ▲
              </p>
            ) : null}
          </div>

          <div className="mt-4">
            <button
              className="bg-nav hover:bg-navHover font-bold py-2 px-4 rounded "
              type="submit"
              disabled={submitting}
            >
              Wyślij
            </button>{" "}
            <Link href="/">
              <a>Anuluj</a>
            </Link>
          </div>
        </>
      ) : null}
    </form>
  );
};

export default CoalDepotForm;
