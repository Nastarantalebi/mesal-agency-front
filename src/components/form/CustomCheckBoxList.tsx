import { Checkbox } from "../ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { Controller, type FieldValues } from "react-hook-form";
import type { Props } from "./PropsType";

const CustomCheckboxList = <T extends FieldValues>({
  name,
  control,
  items,
}: Props<T>) => {
  return (
    <div className="min-w-0 w-full">
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const currentValues: string[] = Array.isArray(field.value)
            ? field.value
            : [];

          return (
            <FieldGroup className="mx-auto w-ful">
              <Field orientation="vertical" className="">
                {items?.map((item) => {
                  const value =
                    "value" in item ? String(item.value) : String(item.id);
                  const label = "label" in item ? item.label : item.name;
                  const uniqueId = `${name}-${value}`;
                  const isChecked = currentValues.includes(value);

                  return (
                    <div key={value} className="flex items-center gap-2 py-1">
                      <Checkbox
                        id={uniqueId}
                        checked={isChecked}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            field.onChange([...currentValues, value]);
                          } else {
                            field.onChange(
                              currentValues.filter((v) => v !== value),
                            );
                          }
                        }}
                      />
                      <FieldLabel htmlFor={uniqueId}>{label}</FieldLabel>
                    </div>
                  );
                })}
              </Field>
            </FieldGroup>
          );
        }}
      />
    </div>
  );
};

export default CustomCheckboxList;
