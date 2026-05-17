import CustomButton from "@/components/form/CustomButton";
import FormErrorModal from "@/components/form/FormErrorModal";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FeaturesFields } from "../../fixtures/FeatuesField";
import {
  FeaturesInitialValues,
  FeaturesValidation,
} from "../../fixtures/validation";
import { useFeatures } from "../../services/useSetting";
import type { TCFeature } from "../toursTemplate/types";
import formTypes from "@/components/form/FormInputTypes";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Props {
  asModal: boolean;
  feature_id?: number | null;
  title?: string;
  open?: boolean;
  onCloseModal?: () => void;
  onOpenChange?: (open: boolean) => void;
  buttonTitle: string;
}

const AddFeaturesForm = ({
  feature_id,
  asModal,
  title,
  onOpenChange,
  open,
  onCloseModal,
  buttonTitle,
}: Props) => {
  const { getfeatureData, postFeature, putFeature } = useFeatures({
    feature_id,
  });

  // console.log(getfeatureData.data)

  const form = useForm<TCFeature>({
    resolver: zodResolver(FeaturesValidation),
    defaultValues: FeaturesInitialValues,
  });

  useEffect(() => {
    if (!getfeatureData.data) return;
    if (feature_id) {
      form.reset({
        ...FeaturesInitialValues,
        ...getfeatureData.data,
      });
    } else {
      form.reset(FeaturesInitialValues);
    }
  }, [getfeatureData.data, feature_id]);

  const [errorOpen, setErrorOpen] = useState(false);
  const errmessage = "ثبت فرم با خطا مواجه شد، لطفاً دوباره تلاش کنید.";

  const handleSubmit = (value: TCFeature) => {
    // console.log("values=", value)
    const isEdit = !!feature_id;
    if (isEdit) {
      putFeature.mutateAsync(
        { data: value, id: feature_id },
        {
          onError: () => setErrorOpen(true),
        },
      );
      if (onCloseModal) {
        onCloseModal();
      }
      form.reset(FeaturesInitialValues);
    } else {
      postFeature.mutateAsync(value, {
        onSuccess: () => {
          form.reset(FeaturesInitialValues);
        },
        onError: () => setErrorOpen(true),
      });
    }
  };

  const formContent = (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8  items-start gap-7"
      >
        {FeaturesFields.map((item) => (
          <div
            key={String(item.name)}
            className={item.className || "col-span-1"}
          >
            {formTypes<TCFeature>(item, form.control)}
          </div>
        ))}
        <div className="my-1">
          <CustomButton type="submit">{buttonTitle}</CustomButton>
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

  if (asModal) {
    return (
      <>
        <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogContent className="sm:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-4xl h-50">
            <DialogHeader>
              <DialogTitle className="">{title}</DialogTitle>
            </DialogHeader>
            {formContent}
          </DialogContent>
        </Dialog>
        <FormErrorModal
          open={errorOpen}
          message={errmessage}
          onOpenChange={setErrorOpen}
          onAcknowledge={() => setErrorOpen(false)}
        />
      </>
    );
  }

  return (
    <>
      {formContent}
      <FormErrorModal
        open={errorOpen}
        message={errmessage}
        onOpenChange={setErrorOpen}
        onAcknowledge={() => setErrorOpen(false)}
      />
    </>
  );
};

export default AddFeaturesForm;
