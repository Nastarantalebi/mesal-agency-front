import CustomButton from "@/components/form/CustomButton";
import FormErrorModal from "@/components/form/FormErrorModal";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FeaturesFields } from "../../fixtures/FeatuesField";
import { FeaturesInitialValues, FeaturesValidation } from "../../fixtures/validation";
import { useFeatures } from "../../services/useSetting";
import type { TCFeature } from "../../types";
import formTypes from "@/components/form/FormInputTypes";

const AddFeaturesForm = () => {
  
  const { postFeature } = useFeatures();

  const form = useForm<TCFeature>({
    resolver: zodResolver(FeaturesValidation),
    defaultValues: FeaturesInitialValues,
  });

  const [errorOpen, setErrorOpen] = useState(false);
  const errmessage = "ثبت فرم با خطا مواجه شد، لطفاً دوباره تلاش کنید.";

  const handleSubmit = (value: TCFeature) => {
    postFeature.mutateAsync(value, {
      onSuccess: () => {
        form.reset(FeaturesInitialValues);
      },
      onError: () => setErrorOpen(true),
    });
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8  items-end gap-7">
        {FeaturesFields.map((item) => (
          <div
            key={String(item.name)}
            className={item.className || "col-span-1"}
          >
            {formTypes<TCFeature>(item, form.control)}
          </div>
        ))}
        <div className="my-1">
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

export default AddFeaturesForm;

