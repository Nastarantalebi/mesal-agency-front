import DatePicker from "react-multi-date-picker";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_en from "react-date-object/locales/gregorian_en";
import type { Props } from "./PropsType";
import { Label } from "../ui/label";
import { FormField, FormMessage } from "../ui/form";
import { Controller, type FieldValues } from "react-hook-form";

const DateInput = <T extends FieldValues>({
  name,
  label,
  isRequired,
  control,
}: Props<T>) => {
  return (
    <div className="min-w-0 w-full">
      <Label className="block mb-3 mr-3">
        {label}
        {isRequired && <span className="text-red-600 dir">*</span>}
      </Label>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <>
            <DatePicker
              value={field.value}
              calendar={gregorian}
              locale={gregorian_en}
              calendarPosition="bottom-right"
              containerClassName="w-full"
              inputClass={
                `w-full rounded-md border p-2 h-9 ` +
                `${fieldState.error ? "border-red-600" : "border-input"}`
              }
            />
            <FormMessage />
          </>
        )}
      />
    </div>
  );
};

export default DateInput;
