import {
  miladiToShamsi,
  shamsiToMiladi,
} from "@/components/form/DateConverter";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, type Dispatch, type SetStateAction } from "react";
import { useForm } from "react-hook-form";
import useValidation from "../fixtures/useValidation";
import useAccomodationFields from "../hooks/useAccomodationFields";
import { useAccommodation } from "../services/useAccommodation";
import type { TCreateAccomodation } from "../types";
import CustomLoader from "@/components/loading/CustomLoader";
import FormComponent from "@/_components/Form/Form";

const AccommodationForm = ({
  AccommodationId,
  setOpenModal,
}: {
  AccommodationId?: number;
  setOpenModal?: Dispatch<SetStateAction<boolean>>;
}) => {
  const {
    getAccommodation,
    postAccommodation,
    ispendingPost,
    putAccommodation,
    ispendingPut,
  } = useAccommodation(AccommodationId!);
  const { accommodationValidation, accommodationInitialValues } =
    useValidation();

  const form = useForm<TCreateAccomodation>({
    resolver: zodResolver(accommodationValidation),
    defaultValues: accommodationInitialValues,
  });

  console.log(form.watch());

  useEffect(() => {
    if (!getAccommodation.data) return;
    const transformedData = {
      ...getAccommodation.data,
      manufacture_date: getAccommodation.data.manufacture_date
        ? miladiToShamsi(getAccommodation.data.manufacture_date)
        : undefined,

      open_start: miladiToShamsi(getAccommodation.data.open_start),
      open_end: miladiToShamsi(getAccommodation.data.open_end),
    };
    form.reset({
      ...accommodationInitialValues,
      ...transformedData,
      type:
        transformedData.type?.id != null ? String(transformedData.type.id) : "",
      city:
        transformedData.city?.id != null
          ? String(transformedData.city.id)
          : null,
      provience: transformedData.city?.province?.id ?? null,
    });
  }, [getAccommodation.data]);

  const province_id = form.watch("provience");

  const { accommodationFields } = useAccomodationFields(Number(province_id));

  const handleSubmit = (value: TCreateAccomodation) => {
    const isEdit = !!AccommodationId;

    const transformedData = {
      ...accommodationInitialValues,
      ...value,
      manufacture_date: value.manufacture_date
        ? shamsiToMiladi(value.manufacture_date)
        : null,

      open_start: shamsiToMiladi(value.open_start),
      open_end: shamsiToMiladi(value.open_end),
    };

    if (isEdit) {
      putAccommodation(
        { data: transformedData, id: AccommodationId },
        { onSuccess: () => setOpenModal?.(false) },
      );
    } else {
      postAccommodation(transformedData, {
        onSuccess: () => {
          {
            form.reset(accommodationInitialValues);
            setOpenModal?.(false);
          }
        },
      });
    }
  };

  if (getAccommodation.isFetching)
    return (
      <div className="p-4 justify-center items-center">
        <CustomLoader />
      </div>
    );

  return (
    <FormComponent<TCreateAccomodation>
      onSubmit={(value) => handleSubmit(value)}
      form={form}
      isSubmitting={ispendingPut || ispendingPost}
      formFields={accommodationFields}
    />
  );
};

export default AccommodationForm;
