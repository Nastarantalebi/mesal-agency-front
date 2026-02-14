import CustomButton from "@/components/form/CustomButton";
import { Form } from "@/components/ui/form";
import type { TCFeature, TFeatureResponse } from "../types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FeaturesInitialValues,
  FeaturesValidation,
} from "../fixtures/Validation";
import { features_key, features_url } from "@/data/querykeys";
import { useState } from "react";
import usePostData from "@/services/usePostData";
import { toast } from "sonner";
import { FeaturesFields } from "../fixtures/FeatuesField";
import formTypes from "@/components/form/formInputTypes";
import FormErrorModal from "@/components/FormErrorModal";

const AddFeaturesForm = () => {
  const form = useForm<TCFeature>({
    resolver: zodResolver(FeaturesValidation),
    defaultValues: FeaturesInitialValues,
  });

  const createMutation = usePostData<TCFeature, TFeatureResponse>({
    key: [features_key],
    url: features_url,
  });

  const [errorOpen, setErrorOpen] = useState(false);
  const errmessage = "ثبت فرم با خطا مواجه شد، لطفاً دوباره تلاش کنید.";

  const handleSubmit = (value: TCFeature) => {
    createMutation.mutateAsync(value, {
      onSuccess: () => {
        toast.success("افزودن ویژگی با موفقیت انجام شد");
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

