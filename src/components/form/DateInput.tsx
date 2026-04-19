import DatePicker, { DateObject } from "react-multi-date-picker";
import type { Props } from "./PropsType";
import { Label } from "../ui/label";
import { Controller, type FieldValues } from "react-hook-form";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

const DateInput = <T extends FieldValues>({
  name,
  label,
  placeholder,
  isRequired,
  control,
  className,
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
              placeholder={placeholder}
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
                `${fieldState.error ? "border-red-600" : `${className}`}`
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
