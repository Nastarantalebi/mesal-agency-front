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
import { Button } from "@/components/ui/button";
import usePostData from "@/services/usePostData";
import { accommodation_key, accommodation_url } from "@/data/querykeys";
import Submitbutton from "@/components/form/Submitbutton";

const AccommodationForm = () => {
  const form = useForm<TCreateAccomodation>({
    resolver: zodResolver(accommodationValidation),
    defaultValues: accommodationInitialValues,
  });

  const province_id = form.watch("provience");
  const accommodationFields = useAccomodationFields(province_id);
  const { mutateAsync, isPending } = usePostData<
    TCreateAccomodation,
    TAccommodationResponse
  >({ key: [accommodation_key], url: accommodation_url });

  const handleSubmit = (value: TCreateAccomodation) => {
    mutateAsync(value);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6"
      >
        {accommodationFields.map((item) => (
          <div key={item.name} className="flex flex-col">
            {formFields<TCreateAccomodation>(item, form.control)}
          </div>
        ))}
        <div className="col-span-1 md:col-span-2 lg:col-span-6 mt-4 flex justify-end pl-60 pt-40">
          <Submitbutton ispending={isPending}></Submitbutton>
        </div>
      </form>
    </Form>
  );
};

export default AccommodationForm;
