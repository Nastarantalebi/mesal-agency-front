import { Checkbox } from "../ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { Controller, type FieldValues } from "react-hook-form";
import type { Props } from "./PropsType";

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
        render={({ field, fieldState }) => (
          <>
            <FieldGroup className="mx-auto w-full">
              <Field orientation="horizontal">
                <Checkbox
                  id={id}
                  checked={!!field.value}
                  onCheckedChange={(checked) =>
                    field.onChange(checked === true)
                  }
                />
                <FieldLabel htmlFor={id}>
                  {label}
                  {isRequired && <span className="text-red-600">*</span>}
                </FieldLabel>
              </Field>
            </FieldGroup>
            {fieldState.error?.message && (
              <p className="text-[0.8rem] font-medium text-destructive">
                {fieldState.error.message}
              </p>
            )}
          </>
        )}
      />
    </div>
  );
};

export default CustomCheckbox;
