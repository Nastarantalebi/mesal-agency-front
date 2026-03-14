import FormErrorModal from "@/components/FormErrorModal";
import CustomButton from "@/components/form/CustomButton";
import {
  miladiToShamsi,
  shamsiToMiladi,
} from "@/components/form/DateConverter";
import formTypes from "@/components/form/formInputTypes";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import AccomodationFields from "../Accommodation/hooks/accomodationFields";
import type { TCreateAccomodation } from "../Accommodation/types";
import useAddAccommodation from "./services/useAddAccommodation";
import useValidation from "../Accommodation/fixtures/useValidation";

const AccommodationForm = ({
  accommodationId,
  buttonText,
}: {
  accommodationId?: string;
  buttonText: string;
}) => {
  const {post, put, get } = useAddAccommodation(accommodationId);
  const {accommodationValidation, accommodationInitialValues} = useValidation()

  const form = useForm<TCreateAccomodation>({
    resolver: zodResolver(accommodationValidation),
    defaultValues: accommodationInitialValues,
  });

  useEffect(() => {
    if (!get.data) return;
    const transformedData = {
      ...get.data,
      manufacture_date: get.data.manufacture_date
        ? miladiToShamsi(get.data.manufacture_date)
        : undefined,

      open_start: miladiToShamsi(get.data.open_start),
      ope_end: miladiToShamsi(get.data.open_end),

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
  }, [get.data]);

  const province_id = form.watch("provience");

  const accommodationFields = AccomodationFields(Number(province_id));

  const [errorOpen, setErrorOpen] = useState(false);
  const errmessage = "ثبت فرم با خطا مواجه شد، لطفاً دوباره تلاش کنید.";

  const handleSubmit = (value: TCreateAccomodation) => {
    const isEdit = !!accommodationId;

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
      put.mutateAsync(transformedData, {
        onSuccess: () => {
          toast.success("ویرایش با موفقیت انجام شد ");
        },
        onError: () => setErrorOpen(true),
      });
    } else {
      post.mutateAsync(transformedData, {
        onSuccess: () => {
          toast.success("اقامتگاه با موفقیت ثبت شد ");
          form.reset(accommodationInitialValues);
        },
        onError: () => setErrorOpen(true),
      });
    }
  };

  if (get.isFetching) return <div className="p-4">Loading...</div>;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="grid w-full min-w-0 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 items-start pr-10"
      >
        {accommodationFields.map((item) => (
          <div
            key={String(item.name)}
            className={item.className || "col-span-1"}
          >
            {formTypes<TCreateAccomodation>(item, form.control)}
          </div>
        ))}

        <div className="col-span-1 md:col-span-2 lg:col-span-4 flex justify-end gap-3">
          <CustomButton type="submit">{buttonText}</CustomButton>
        </div>
      </form>
      <FormErrorModal
        open={errorOpen}
        message={errmessage}
        onOpenChange={setErrorOpen}
        onAcknowledge={() => setErrorOpen(false)}
      />
    </Form>
  );
};

export default AccommodationForm;
