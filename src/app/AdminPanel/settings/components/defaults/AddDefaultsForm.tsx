import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useDefaults } from "../../services/useSetting";
import {
  DefaultsInitialValues,
  DefaultsValidation,
} from "../../fixtures/validation";
import { DefaultFields } from "../../fixtures/DefaultFields";
import type { TCreateDefaults } from "../../types";
import FormComponent from "@/_components/Form/Form";

const DefaultsForm = () => {
  const { getDefaults, postDefaults } = useDefaults();

  const form = useForm<TCreateDefaults>({
    resolver: zodResolver(DefaultsValidation),
    defaultValues: DefaultsInitialValues,
  });

  useEffect(() => {
    if (!getDefaults.data) return;
    form.reset(getDefaults.data);
  }, [getDefaults.data]);

  const handleSubmit = (value: TCreateDefaults) => {
    postDefaults.mutateAsync(value);
  };

  return (
    <FormComponent<TCreateDefaults>
      form={form}
      onSubmit={handleSubmit}
      formFields={DefaultFields}
    />
  );
};

export default DefaultsForm;
