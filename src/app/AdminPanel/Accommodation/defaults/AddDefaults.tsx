import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import type { TCreateDefaults, TResponseDefaults } from "./types";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  DefaultsValidation,
  FeaturesInitialValues,
} from "./fixtures/validation";
import usePostData from "@/services/usePostData";
import { default_key, default_url } from "@/data/querykeys";
import { DefaultFields } from "./fixtures/DefaultFields";
import formTypes from "@/components/form/formInputTypes";
import CustomButton from "@/components/form/CustomButton";
import FormErrorModal from "@/components/FormErrorModal";
import { useState } from "react";
import { toast } from "sonner";


const DefaultsForm = () => {
  
  const form = useForm<TCreateDefaults>({
    resolver: zodResolver(DefaultsValidation),
    defaultValues: FeaturesInitialValues,
  });

  const createDefaults = usePostData<TCreateDefaults, TResponseDefaults>({
    key: [default_key],
    url: default_url,
  });

  const [errorOpen, setErrorOpen] = useState(false);
  const errmessage = "تنظیمات پیشفرض با موفقیت اعمال شد";

  const handleSubmit = (value: TCreateDefaults) => {
    createDefaults.mutateAsync(value, {
      onSuccess: () => {
        toast.success("نوع تخت با موفقیت افزوده شد");
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
        {DefaultFields.map((item) => (
          <div
            key={String(item.name)}
            className={item.className || "col-span-1"}
          >
            {formTypes<TCreateDefaults>(item, form.control)}
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

export default DefaultsForm;
