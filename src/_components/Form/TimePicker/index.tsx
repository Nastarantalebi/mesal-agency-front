import clsx from "clsx";
import { useEffect, useRef } from "react";
import type { ControllerRenderProps, FieldValues, Path } from "react-hook-form";
import DatePicker, {
  DateObject,
  type DatePickerRef,
} from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import { useOutsideClick } from "../useOutsideClick";

type TProps<TFormValues extends FieldValues> = {
  field: ControllerRenderProps<TFormValues, Path<TFormValues>>;
  inputClassName?: string;
  autoFocus?: boolean;
  portal?: boolean;
  hasError?: boolean;
};

function TimePickerField<TFormValues extends FieldValues>({
  field,
  inputClassName,
  autoFocus = false,
  portal = false,
  hasError,
}: TProps<TFormValues>) {
  const { onChange, value: fieldValue } = field;
  const datePickerRef = useRef<DatePickerRef>(null);
  useEffect(() => {
    if (autoFocus && datePickerRef.current) {
      datePickerRef.current.focus();
    }
  }, [autoFocus]);

  // ✅ اگر مقدار اولیه HH:mm:ss بود، آن را به HH:mm تبدیل کن
  useEffect(() => {
    if (
      typeof fieldValue === "string" &&
      fieldValue.match(/^\d{2}:\d{2}:\d{2}$/)
    ) {
      onChange(fieldValue.slice(0, 5));
    }
  }, [fieldValue, onChange]);

  const convertToDateObject = (timeString?: string) => {
    if (!timeString) return null;
    const [hours, minutes] = timeString.split(":").map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return new DateObject(date);
  };

  const handleChange = (date: DateObject | null) => {
    if (date) onChange(date.format("HH:mm"));
    else onChange("");
  };

  const wrapperRef = useRef<HTMLDivElement>(null);

  useOutsideClick(wrapperRef, datePickerRef);

  return (
    <div ref={wrapperRef}>
      <DatePicker
        portal={portal}
        ref={datePickerRef}
        disableDayPicker
        format="HH:mm"
        containerStyle={{ width: "100%", direction: "ltr" }}
        value={convertToDateObject(fieldValue)}
        onChange={handleChange}
        plugins={[<TimePicker hideSeconds key="time-picker" />]}
        inputClass={clsx(
          "w-full rounded-md border px-3 py-2 text-sm",
          "bg-white text-gray-900 border-gray-300 placeholder-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          inputClassName,
          {
            "!border !border-danger": hasError,
          },
        )}
      />
    </div>
  );
}

export default TimePickerField;
