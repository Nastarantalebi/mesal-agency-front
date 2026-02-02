import formFields from "@/components/form/formInputTypes";
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
import FormErrorModal from "./FormErrorModal";
import { useEffect, useState } from "react";
import useGetData from "@/services/useGetData";

interface Props {
  id?: string;
}

function toFormValues(
  detailData: TAccommodationResponse,
  initial: TCreateAccomodation,
): TCreateAccomodation {
  return {
    ...initial,

    name: detailData.name ?? "",
    description: detailData.description ?? "",
    address: detailData.address ?? "",

    type: detailData.type?.id != null ? String(detailData.type.id) : "",
    city: detailData.city?.id != null ? String(detailData.city.id) : "",

    manufacture_date: detailData.manufacture_date ?? "",

    floors: detailData.floors != null ? String(detailData.floors) : "",
    stars: detailData.stars != null ? String(detailData.stars) : "",
    total_rooms:
      detailData.total_rooms != null ? String(detailData.total_rooms) : "",

    check_in_time: detailData.check_in_time ?? "",
    check_out_time: detailData.check_out_time ?? "",

    latitude: detailData.latitude != null ? String(detailData.latitude) : "",
    longitude: detailData.longitude != null ? String(detailData.longitude) : "",

    max_guests:
      detailData.max_guests != null ? String(detailData.max_guests) : "",
    area_sqm: detailData.area_sqm != null ? String(detailData.area_sqm) : "",

    has_reception_24h: Boolean(detailData.has_reception_24h),
    has_elevator: Boolean(detailData.has_elevator),
    built_with_local_materials: Boolean(detailData.built_with_local_materials),
    allows_local_food_experience: Boolean(
      detailData.allows_local_food_experience,
    ),
    is_active: Boolean(detailData.is_active),
  };
}

const AccommodationForm = ({ id }: Props) => {
  console.log(`id= ${id}`)
  const [step, setStep] = useState(1);
  const TOTAL_STEPS = 2;

  const form = useForm<TCreateAccomodation>({
    resolver: zodResolver(accommodationValidation),
    defaultValues: accommodationInitialValues,
  });
  const idRequired = id!;

  const { data: detailData, isLoading } = useGetData<TAccommodationResponse>({
    key: [accommodation_key, idRequired],
    url: `${accommodation_url}${idRequired}/`,
  });

  useEffect(() => {
    if (!detailData) return;
    form.reset(toFormValues(detailData, accommodationInitialValues));
  }, [detailData, form]);

  const stepFields: Record<number, (keyof TCreateAccomodation)[]> = {
    1: ["type", "name", "provience", "city", "description", "address"],
    2: [
      "manufacture_date",
      "floors",
      "stars",
      "total_rooms",
      "check_in_time",
      "check_out_time",
      "latitude",
      "longitude",
      "max_guests",
      "area_sqm",
      "has_reception_24h",
      "has_elevator",
      "built_with_local_materials",
      "allows_local_food_experience",
      "is_active",
    ],
  };

  const handleNext = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const ok = await form.trigger(stepFields[step] as any);
    e.preventDefault();
    if (!ok) return;
    setStep((s) => {
      const next = Math.min(s + 1, TOTAL_STEPS);
      return next;
    });
  };

  const handleBack = () => setStep((s) => Math.max(s - 1, 1));

  const province_id = form.watch("provience");
  const accommodationFields = useAccomodationFields(province_id);

  const currentFields = accommodationFields.filter((item) =>
    stepFields[step].includes(item.name),
  );

  const { mutateAsync, isPending } = usePostData<
    TCreateAccomodation,
    TAccommodationResponse
  >({ key: [accommodation_key], url: accommodation_url });

  const [errorOpen, setErrorOpen] = useState(false);
  const errmessage = "ثبت فرم با خطا مواجه شد، لطفاً دوباره تلاش کنید.";

  const handleSubmit = (value: TCreateAccomodation) => {
    mutateAsync(value, {
      onSuccess: () => {
        toast.success("اقامتگاه با موفقیت ثبت شد ✅");
        form.reset(accommodationInitialValues);
        setStep(1);
      },
      onError: () => {
        setErrorOpen(true);
      },
    });
  };

  if (isLoading) return <div className="p-4">Loading...</div>;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="grid w-full min-w-0 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 items-start pr-10"
      >
        {currentFields.map((item) => (
          <div
            key={String(item.name)}
            className={item.className || "col-span-1"}
          >
            {formFields<TCreateAccomodation>(item, form.control)}
          </div>
        ))}

        <div className="col-span-1 md:col-span-2 lg:col-span-4 flex justify-end gap-3">
          {step > 1 && (
            <CustomButton onClick={handleBack} ispending={false} type="button">
              قبلی
            </CustomButton>
          )}

          {step < TOTAL_STEPS ? (
            <CustomButton onClick={handleNext} ispending={false} type="button">
              بعدی
            </CustomButton>
          ) : (
            <CustomButton ispending={isPending} type="submit">
              ثبت
            </CustomButton>
          )}
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
