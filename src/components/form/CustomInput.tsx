import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Controller, type FieldValues } from "react-hook-form";
import type { Props } from "./PropsType";

export type InputType = "text" | "number" | "email" | "password" | "tel";

const CustomInput = <T extends FieldValues>({
  name,
  label,
  isRequired,
  inputType = "text",
  control,
  maxLength,
  icon,
  direction,
  placeholder,
}: Props<T>) => {
  // if (inputType === "number" || inputType === "tel") direction = "ltr";
  

  return (
    <>
      <Label className="block my-2">
        {label}
        {isRequired && <span className="text-red-600">*</span>}
      </Label>
      <div className="min-w-0 w-full space-y-2" dir={direction}>
        <Controller
          name={name}
          control={control}
          render={({ field, fieldState }) => (
            <>
              <div className="relative">
                <Input
                  {...field}
                  type={inputType}
                  dir={direction}
                  maxLength={maxLength}
                  placeholder={placeholder}
                  onChange={(e) => {
                    if (inputType === "number") {
                      field.onChange(e.target.valueAsNumber ?? 0);
                    } else {
                      field.onChange(e.target.value);
                    }
                  }}
                  className={`pr-10 ${fieldState.error ? "border-red-600" : ""}`}
                />
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-700 items-center justify-center flex cursor-pointer">
                  {icon}
                </span>
              </div>
              {fieldState.error?.message && (
                <p className="text-[0.8rem] font-medium text-destructive">
                  {fieldState.error.message}
                </p>
              )}
            </>
          )}
        />
      </div>
    </>
  );
};

export default CustomInput;
