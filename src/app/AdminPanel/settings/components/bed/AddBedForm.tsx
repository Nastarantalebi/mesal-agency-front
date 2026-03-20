import CustomButton from "@/components/form/CustomButton";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";


import formTypes from "@/components/form/formInputTypes";
import FormErrorModal from "@/components/FormErrorModal";
import { useState } from "react";
import { BedFields } from "../../fixtures/BedsField";
import { bedInitialValues, bedValidation } from "../../fixtures/validation";
import { useBeds } from "../../services/useSetting";
import type { TCreateBed } from "../../types";

const AddBedsForm = () => {
  const form = useForm<TCreateBed>({
    resolver: zodResolver(bedValidation),
    defaultValues: bedInitialValues,
  });

  const { postBed } = useBeds();

  const [errorOpen, setErrorOpen] = useState(false);
  const errmessage = "ثبت تخت با خطا مواجه شد، لطفاً دوباره تلاش کنید.";

  const handleSubmit = (value: TCreateBed) => {
    postBed.mutateAsync(value, {
      onSuccess: () => {
        form.reset(bedInitialValues);
      },
      onError: () => setErrorOpen(true),
    });
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {BedFields.map((item) => (
          <div
            key={String(item.name)}
            className={item.className || "col-span-1"}
          >
            {formTypes<TCreateBed>(item, form.control)}
          </div>
        ))}
        <div className="col-span-1 md:col-span-2 lg:grid-cols-4 flex justify-start gap-3 mt-6">
          <CustomButton type="submit">افزودن</CustomButton>
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

export default AddBedsForm;
