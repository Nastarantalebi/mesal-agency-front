import useAccomodationFields from "../Accommodation/hooks/accomodationFields";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  accommodationInitialValues,
  accommodationValidation,
} from "../Accommodation/fixtures/validation";
import type {
  TAccommodationResponse,
  TCreateAccomodation,
} from "../Accommodation/types";
import { Form } from "@/components/ui/form";
import usePostData from "@/services/usePostData";
import { accommodation_key, accommodation_url } from "@/data/querykeys";
import CustomButton from "@/components/form/CustomButton";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import useGetData from "@/services/useGetData";
import usePutData from "@/services/usePutData";
import FormErrorModal from "@/components/FormErrorModal";
import formTypes from "@/components/form/formInputTypes";
import {
  miladiToShamsi,
  shamsiToMiladi,
} from "@/components/form/DateConverter";

const AccommodationForm = ({
  accommodationId,
  buttonText,
}: {
  accommodationId?: string;
  buttonText: string;
}) => {
  const form = useForm<TCreateAccomodation>({
    resolver: zodResolver(accommodationValidation),
    defaultValues: accommodationInitialValues,
  });

  const { data, isFetching } = useGetData<TAccommodationResponse>({
    key: [accommodation_key, String(accommodationId)],
    url: `${accommodation_url}${accommodationId}/`,
    enabled: !!accommodationId,
  });

  useEffect(() => {
    if (!data) return;
    const transformedData = {
      ...data,
      manufacture_date: data.manufacture_date
        ? miladiToShamsi(data.manufacture_date)
        : undefined,
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
  }, [data]);

  const province_id = form.watch("provience");

  const accommodationFields = useAccomodationFields(Number(province_id));

  const createMutation = usePostData<
    TCreateAccomodation,
    TAccommodationResponse
  >({
    key: [accommodation_key],
    url: accommodation_url,
  });

  const updateMutation = usePutData<
    TCreateAccomodation,
    TAccommodationResponse
  >({
    key: [accommodation_key, String(accommodationId)],
    url: `${accommodation_url}${accommodationId}`,
  });

  const [errorOpen, setErrorOpen] = useState(false);
  const errmessage = "ثبت فرم با خطا مواجه شد، لطفاً دوباره تلاش کنید.";

  const handleSubmit = (value: TCreateAccomodation) => {
    const isEdit = !!accommodationId;

    // console.log(`value: ${JSON.stringify(value)}`)

    const transformedData = {
      ...accommodationInitialValues,
      ...value,
      manufacture_date: value.manufacture_date
        ? shamsiToMiladi(value.manufacture_date)
        : null,
    };

    // console.log(`transformedData:${JSON.stringify(transformedData)}`)

    if (isEdit) {
      updateMutation.mutateAsync(transformedData, {
        onSuccess: () => {
          toast.success("ویرایش با موفقیت انجام شد ");
        },
        onError: () => setErrorOpen(true),
      });
    } else {
      createMutation.mutateAsync(transformedData, {
        onSuccess: () => {w
          toast.success("اقامتگاه با موفقیت ثبت شد ");
          form.reset(accommodationInitialValues);
        },
        onError: () => setErrorOpen(true),
      });
    }
  };

  if (isFetching) return <div className="p-4">Loading...</div>;

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
