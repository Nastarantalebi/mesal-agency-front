import { Controller, type FieldValues } from "react-hook-form";
import type { Props } from "./PropsType";
import { Label } from "@radix-ui/react-label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

const Radio = <T extends FieldValues>({
  name,
  label,
  isRequired,
  control,
  className,
  items,
}: Props<T>) => {
  return (
    <div className="w-full min-w-0">
      <Label className="block mb-3 mr-3">
        {label}
        {isRequired && <span className="text-red-600">*</span>}
      </Label>

      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <>
            <RadioGroup
              value={String(field.value ?? "")}
              onValueChange={(value) => {
                field.onChange(value);
              }}
              className={`w-fit flex flex-wrap justify-around items-center gap-4 rounded-md border p-2 min-h-5 ${
                fieldState.error ? "border-red-600" : `${className}`
              }`}
            >
              <div className="flex items-center gap-3 flex-wrap">
                {items?.map((item, index) => {
                  // Determine actual value
                  const value =
                    "value" in item ? String(item.value) : String(item.id);

                  // Determine label text
                  const text =
                    "label" in item ? item.label : item.name;

                  const inputId = `${name}-${value}-${index}`;

                  return (
                    <div key={value} className="flex items-center gap-2">
                      <RadioGroupItem value={value} id={inputId} />
                      <Label htmlFor={inputId}>{text}</Label>
                    </div>
                  );
                })}
              </div>
            </RadioGroup>

            {fieldState.error && (
              <p className="text-sm font-medium text-destructive mt-1">
                {fieldState.error.message}
              </p>
            )}
          </>
        )}
      />
    </div>
  );
};

export default Radio;
