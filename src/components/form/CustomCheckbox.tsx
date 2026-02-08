import { Checkbox } from "../ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { Controller, type FieldValues } from "react-hook-form";
import type { Props } from "./PropsType";
import { FormField } from "../ui/form";

const CustomCheckbox = <T extends FieldValues>({
  name,
  label,
  isRequired,
  control,
}: Props<T>) => {
  const id = String(name);

  return (
    <div className="min-w-0 w-full">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <FieldGroup className="mx-auto w-full">
            <Field orientation="horizontal">
              <Checkbox
                id={id}
                checked={!!field.value}
                onCheckedChange={(checked) => field.onChange(checked === true)}
              />
              <FieldLabel htmlFor={id}>
                {label}
                {isRequired && <span className="text-red-600">*</span>}
              </FieldLabel>
            </Field>
          </FieldGroup>
        )}
      />
    </div>
  );
};

export default CustomCheckbox;
