import useAccomodationFields from "../hooks/useAccomodationFields";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  accommodationInitialValues,
  accommodationValidation,
} from "../fixtures/validation";
import type { TAccommodationResponse, TCreateAccomodation } from "../types";
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

const AccommodationForm = ({ accommodationId }: { accommodationId?: string }) => {

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
    form.reset({
      ...data,
      type: data.type?.id != null ? String(data.type.id) : "",
      city: data.city?.name,
    });
  }, [data]);

  // const stepFields: Record<number, (keyof TCreateAccomodation)[]> = {
  //   1: [
  //     "type",
  //     "name",
  //     "provience",
  //     "city",
  //     "description",
  //     "address",
  //     "manufacture_date",
  //     "floors",
  //     "stars",
  //     "total_rooms",
  //     "check_in_time",
  //     "check_out_time",
  //     "latitude",
  //     "longitude",
  //     "max_guests",
  //     "area_sqm",
  //     "has_reception_24h",
  //     "has_elevator",
  //     "built_with_local_materials",
  //     "allows_local_food_experience",
  //     "is_active",
  //   ],
  // };

  // const handleNext = async (e: React.MouseEvent<HTMLButtonElement>) => {
  //   const ok = await form.trigger(stepFields[step] as any);
  //   e.preventDefault();
  //   if (!ok) return;
  //   setStep((s) => {
  //     const next = Math.min(s + 1, TOTAL_STEPS);
  //     return next;
  //   });
  // };

  // const handleBack = () => setStep((s) => Math.max(s - 1, 1));

  const province_id = form.watch("provience");
  const accommodationFields = useAccomodationFields(province_id);

  // const currentFields = accommodationFields.filter((item) =>
  //   stepFields[step].includes(item.name),
  // );

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

    if (isEdit) {
      updateMutation.mutateAsync(value, {
        onSuccess: () => {
          toast.success("ویرایش با موفقیت انجام شد ");
        },
        onError: () => setErrorOpen(true),
      });
    } else {
      createMutation.mutateAsync(value, {
        onSuccess: () => {
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

        <CustomButton type="submit">ثبت</CustomButton>

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
