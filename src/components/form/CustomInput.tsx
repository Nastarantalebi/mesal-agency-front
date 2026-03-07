import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Controller, type FieldValues } from "react-hook-form";
import type { Props } from "./PropsType";
import { useEffect } from "react";

export type InputType = "text" | "number" | "email" | "password" | "tel";

const CustomInput = <T extends FieldValues>({
  name,
  label,
  isRequired,
  inputType = "text",
  control,
}: Props<T>) => {
  return (
    <div className="min-w-0 w-full space-y-2">
      <Label className="block">
        {label}
        {isRequired && <span className="text-red-600">*</span>}
      </Label>

      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <>
            <Input
              {...field}
              type={inputType}
              dir={inputType === "number" ? "ltr" : undefined}
              onChange={(e) => {
                if (inputType === "number") {
                  if (e.target.value === null) {
                    field.onChange(0);
                  } else {
                    field.onChange(e.target.valueAsNumber);
                  }
                } else {
                  field.onChange(e.target.value);
                }
              }}
              className={`${fieldState.error ? "border-red-600" : ""} ${inputType === "number" ? "text-left" : ""}`}
            />
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

export default CustomInput;
