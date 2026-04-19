import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import type { Props } from "./PropsType";
import { Label } from "../ui/label";
import { Controller, type FieldValues } from "react-hook-form";
import DateObject from "react-date-object";

const TimeInput = <T extends FieldValues>({
  name,
  label,
  isRequired,
  control,
  className,
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
            <DatePicker
              disableDayPicker
              format="HH:mm:ss"
              plugins={[<TimePicker />]}
              calendar={persian}
              locale={persian_fa}
              calendarPosition="bottom-right"
              onChange={(date: DateObject | null) => {
                field.onChange(date ? date.format("HH:mm:ss") : null);
              }}
              render={(value, openCalendar) => (
                <input
                  value={field.value || value}
                  onClick={openCalendar}
                  onChange={() => {}}
                  readOnly
                  className={
                    `w-full rounded-md border p-2 h-9 bg-background cursor-pointer ` +
                    `${fieldState.error ? "border-red-600" : `${className}`}`
                  }
                />
              )}
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

export default TimeInput;
