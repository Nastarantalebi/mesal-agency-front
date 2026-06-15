import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, type Dispatch, type SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { FeaturesFields } from "../../fixtures/FeatuesField";
import {
  FeaturesInitialValues,
  FeaturesValidation,
} from "../../fixtures/validation";
import { useFeatures } from "../../services/useSetting";
import type { TCFeature } from "../../types";
import FormComponent from "@/_components/Form/Form";

interface Props {
  feature_id?: number | null;
  setOpenModal?: Dispatch<SetStateAction<boolean>>;
}

const AddFeaturesForm = ({ feature_id, setOpenModal }: Props) => {
  const isEdit = !!feature_id;
  const { getfeatureData, postFeature, putFeature } = useFeatures({
    feature_id,
  });

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

  const handleSubmit = (value: TCFeature) => {
    if (isEdit) {
      putFeature.mutateAsync(
        { data: value, id: feature_id },
        {
          onSuccess: () => {
            setOpenModal?.(false);
            form.reset(FeaturesInitialValues);
          },
        },
      );
    } else {
      postFeature.mutateAsync(value, {
        onSuccess: () => {
          form.reset(FeaturesInitialValues);
        },
      });
    }
  };

  return (
    <FormComponent<TCFeature>
      form={form}
      onSubmit={handleSubmit}
      formFields={FeaturesFields}
      isSubmitting={postFeature.isPending || putFeature.isPending}
    />
  );
};

export default AddFeaturesForm;
