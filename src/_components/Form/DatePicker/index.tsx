import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import persian from "react-date-object/calendars/persian";
import persian_en from "react-date-object/locales/persian_en";
import persian_fa from "react-date-object/locales/persian_fa";
import type { ControllerRenderProps, FieldValues, Path } from "react-hook-form";
import DatePicker, {
  DateObject,
  type DatePickerRef,
} from "react-multi-date-picker";
import highlightWeekends from "react-multi-date-picker/plugins/highlight_weekends";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import { useOutsideClick } from "../useOutsideClick";

type TProps<TFormValues extends FieldValues> = {
  field: ControllerRenderProps<TFormValues, Path<TFormValues>>;
  inputClassName?: string;
  placeholder?: string;
  showTimePicker?: boolean;
  autoFocus?: boolean;
  max?: DateObject | null;
  min?: DateObject | null;
  portal?: boolean;
  hasError?: boolean;
  showWeekDayName?: boolean;
};

function DatePickerField<TFormValues extends FieldValues>({
  field,
  inputClassName,
  placeholder = "یک تاریخ وارد کنید",
  showTimePicker = false,
  autoFocus = false,
  showWeekDayName = false,
  hasError,
  max,
  min,
  portal = false,
}: TProps<TFormValues>) {
  const { onChange, value: fieldValue } = field;
  const datePickerRef = useRef<DatePickerRef>(null);
  const [weekDay, setWeekDay] = useState<string | null>(null);
  useEffect(() => {
    if (autoFocus && datePickerRef.current) {
      datePickerRef.current.focus();
    }
  }, [autoFocus]);

  const getFormattedValue = (date: DateObject): string => {
    const format = showTimePicker ? "YYYY/MM/DD HH:mm:ss" : "YYYY/MM/DD";
    return date.convert(persian, persian_en).format(format);
  };

  const handleChange = (
    date: DateObject | null,
    options: {
      input: HTMLElement;
      isTyping: boolean;
      validatedValue: string | string[];
    },
  ) => {
    const { input, isTyping } = options;
    if (!isTyping) {
      if (date) {
        setWeekDay(date.weekDay.name);
        onChange(getFormattedValue(date));
      } else {
        setWeekDay(null);
        onChange("");
      }

      return;
    }

    let valueToValidate = (input as HTMLInputElement).value;
    for (const digit of persian_fa.digits) {
      valueToValidate = valueToValidate.replace(
        new RegExp(digit, "g"),
        persian_fa.digits.indexOf(digit).toString(),
      );
    }
    if (/[^0-9/]/.test(valueToValidate)) return false;

    const parts = valueToValidate.split("/");
    const [_year, month, day] = parts;
    if ((month && Number(month) > 12) || (day && Number(day) > 31))
      return false;
    if (month === "00" || day === "00") return false;

    if (date) onChange(getFormattedValue(date));
    else onChange((input as HTMLInputElement).value);
  };
  useEffect(() => {
    if (!fieldValue) {
      setWeekDay(null);
      return;
    }
    try {
      const dateObject = new DateObject({
        date: fieldValue,
        format: showTimePicker ? "YYYY/MM/DD HH:mm:ss" : "YYYY/MM/DD",
        calendar: persian,
        locale: persian_fa,
      });

      setWeekDay(dateObject.weekDay.name); // شنبه، یکشنبه، ...
    } catch {
      setWeekDay(null);
    }
  }, [fieldValue, showTimePicker]);

  const wrapperRef = useRef<HTMLDivElement>(null);
  useOutsideClick(wrapperRef, datePickerRef);

  return (
    <div ref={wrapperRef} className={`${showWeekDayName && "relative"}`}>
      <DatePicker
        portal={portal}
        ref={datePickerRef}
        placeholder={placeholder}
        inputClass={clsx(
          "h-10 w-full rounded-md border px-3 py-2 text-sm ltr",
          "bg-white text-gray-900 border-gray-300 placeholder-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          // دارک مود
          "dark:bg-neutral-800 dark:text-gray-100 dark:border-neutral-600 dark:placeholder-gray-400 dark:focus-visible:ring-blue-400",
          inputClassName,
          {
            "!border !border-danger": hasError,
          },
        )}
        containerStyle={{ width: "100%", direction: "ltr" }}
        minDate={min || undefined}
        maxDate={max || undefined}
        currentDate={max || min || new DateObject()}
        calendar={persian}
        locale={persian_fa}
        value={fieldValue || ""}
        onChange={handleChange}
        format={showTimePicker ? "YYYY/MM/DD HH:mm" : "YYYY/MM/DD"}
        plugins={[
          highlightWeekends(),
          showTimePicker
            ? [
                <TimePicker
                  className="dark:text-neutral-900"
                  key="time-picker"
                  position="bottom"
                  hideSeconds
                  format="HH:mm:ss"
                />,
              ]
            : [],
        ]}
      />
      {weekDay && showWeekDayName && (
        <span
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded bg-blue-100
         px-2 py-0.5 text-xs text-blue-700 dark:bg-blue-900 dark:text-blue-200">
          {weekDay}
        </span>
      )}
    </div>
  );
}

export default DatePickerField;
