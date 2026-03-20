import CustomButton from "@/components/form/CustomButton";
import formTypes from "@/components/form/formInputTypes";
import FormErrorModal from "@/components/form/FormErrorModal";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FeaturesFields } from "../../fixtures/FeatuesField";
import { FeaturesInitialValues, FeaturesValidation } from "../../fixtures/validation";
import { useFeatures } from "../../services/useSetting";
import type { TCFeature } from "../../types";

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
      <form onSubmit={form.handleSubmit(handleSubmit)} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {FeaturesFields.map((item) => (
          <div
            key={String(item.name)}
            className={item.className || "col-span-1"}
          >
            {formTypes<TCFeature>(item, form.control)}
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

export default AddFeaturesForm;

