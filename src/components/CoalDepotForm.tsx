import { useState, useEffect, ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import SearchBox from "./SearchBox";

interface IFormData {
  address: string;
  latitude: number | null;
  longitude: number | null;
  coalDepotName: string;
  telephone: string;
  coalAmount: string;
  image: FileList;
}

interface IProps {}

const CoalDepotForm = ({}: IProps) => {
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<IFormData>({
    defaultValues: {},
  });

  useEffect(() => {
    register({ name: "address" }, { required: "Please enter your address" });
    register({ name: "latitude" }, { required: true, min: -90, max: 90 });
    register({ name: "longitude" }, { required: true, min: -180, max: 180 });
  }, [register]);

  const handleCreate = async (data: IFormData) => {};

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
      <h1 className="text-xl">Dodaj nowy skład opału</h1>

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
      </div>
      <h2>{address}</h2>
    </form>
  );
};

export default CoalDepotForm;
