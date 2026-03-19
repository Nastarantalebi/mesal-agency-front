import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import formTypes from "@/components/form/formInputTypes";
import CustomButton from "@/components/form/CustomButton";
import FormErrorModal from "@/components/FormErrorModal";
import { useEffect, useState } from "react";
import { useAddDefaults } from "../../services/useSetting";
import type { TCreateDefaults } from "../../types";
import { DefaultsInitialValues, DefaultsValidation } from "../../fixtures/validation";
import { DefaultFields } from "../../fixtures/DefaultFields";


const DefaultsForm = () => {
  
  const { getDefaults , postDefaults } = useAddDefaults();

  const form = useForm<TCreateDefaults>({
    resolver: zodResolver(DefaultsValidation),
    defaultValues: DefaultsInitialValues,
  });

  useEffect(() => {
    if(!getDefaults.data) return;
    form.reset(getDefaults.data)
  }, [getDefaults.data])

  const [errorOpen, setErrorOpen] = useState(false);
  const errmessage = "ثبت فرم با خطا مواجه شد";

  const handleSubmit = (value: TCreateDefaults) => {
    postDefaults.mutateAsync(value, {
      onError: () => setErrorOpen(true),
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {DefaultFields.map((item) => (
          <div
            key={String(item.name)}
            className={item.className || "col-span-1"}
          >
            {formTypes<TCreateDefaults>(item, form.control)}
          </div>
        ))}
        <div className="col-start-1 ">
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

export default DefaultsForm;
