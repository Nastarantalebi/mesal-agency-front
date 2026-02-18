import DatePicker, { DateObject } from "react-multi-date-picker";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_en from "react-date-object/locales/gregorian_en";
import type { Props } from "./PropsType";
import { Label } from "../ui/label";
import { FormField, FormMessage } from "../ui/form";
import { Controller, type FieldValues } from "react-hook-form";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

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
              onChange={(date: DateObject | null) => {
                if (date) {
                  field.onChange(date.format("YYYY/MM/DD"));
                } else {
                  field.onChange("");
                }
              }}
              calendar={persian}
              locale={persian_fa}
              calendarPosition="bottom-right"
              containerClassName="w-full"
              inputClass={
                `w-full rounded-md border p-2 h-9 ` +
                `${fieldState.error ? "border-red-600" : "border-input"}`
              }
            />
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

export default DateInput;

{
  /* <DatePicker
  value={field.value}
  onChange={(date: DateObject | null) => {
    if (date) {
      field.onChange(date.format("YYYY/MM/DD"));
    } else {
      field.onChange("");
    }
  }}
  calendar={persian}
  locale={persian_fa}
  calendarPosition="bottom-right"
  containerClassName="w-full"
  inputClass={
    `w-full rounded-md border p-2 h-9 ` +
    `${fieldState.error ? "border-red-600" : "border-input"}`
  }
  format="YYYY/MM/DD"
/> */
}
