import { useContext, forwardRef } from "react";
import { formInlineContext } from "../FormInline";
import { inputGroupContext } from "../InputGroup";
import { numberToWords } from "@persian-tools/persian-tools";
import clsx from "clsx";

interface FormInputProps extends Omit<
  React.ComponentPropsWithoutRef<"input">,
  "onChange"
> {
  formInputSize?: "sm" | "lg";
  rounded?: boolean;
  hasError?: boolean;
  money?: boolean;
  dir?: "ltr" | "rtl";
  maxLength?: number;
  minLength?: number;
  max?: number | string;
  min?: number | string;
  onChange?: ((value: string) => void) | undefined;
}
type FormInputRef = React.ComponentPropsWithRef<"input">["ref"];
const FormInput = forwardRef((props: FormInputProps, ref: FormInputRef) => {
  const {
    money,
    min,
    max,
    minLength,
    maxLength,
    hasError,
    dir,
    onChange,
    value,
    className,
    ...restProps
  } = props;
  const formInline = useContext(formInlineContext);
  const inputGroup = useContext(inputGroupContext);

  const formatMoney = (val: string) => {
    const numbers = val.replace(/[^\d]/g, "");
    return numbers.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;

    if (restProps.type === "number" && !money) {
      if (maxLength !== undefined && val.length > maxLength) return;
      if (val === "" || val === "-" || val === ".") {
        onChange && onChange(e.target.value);
        return;
      }
      const numericValue = parseFloat(val);
      if (
        !isNaN(numericValue) &&
        ((max !== undefined && numericValue > Number(max)) ||
          (min !== undefined && numericValue < Number(min)))
      ) {
        return;
      }
      onChange && onChange(e.target.value);
      return;
    }

    if (!money) {
      onChange && onChange(e.target.value);
      return;
    }

    if (val.endsWith(" ")) {
      const cleaned = val.replace(/[^\d]/g, "");
      val = `${cleaned}000`;
    }

    const onlyNums = val.replace(/[^\d]/g, "");
    if (onlyNums.length > 1 && onlyNums.startsWith("0")) {
      val = onlyNums.replace(/^0+/, "");
    }

    const formatted = formatMoney(val);
    const rawValue = formatted.replace(/,/g, "");

    if (maxLength !== undefined && rawValue.length > maxLength) return;

    const numericValue = parseInt(rawValue, 10);
    if (
      !isNaN(numericValue) &&
      ((max !== undefined && numericValue > Number(max)) ||
        (min !== undefined && numericValue < Number(min)))
    ) {
      return;
    }

    if (onChange) {
      onChange({
        ...e,
        target: { ...e.target, value: rawValue },
      } as any);
    }
    e.target.value = formatted;
  };

  const displayValue = money && value ? formatMoney(String(value)) : value;
  const safeNumberToWords = (value: number) => {
    try {
      return numberToWords(value);
    } catch {
      return "";
    }
  };
  const valueInWords =
    money && value && !isNaN(Number(value))
      ? safeNumberToWords(Number(value))
      : "";

  return (
    <div
      className={clsx("flex flex-col w-full", {
        "flex-1": formInline,
      })}
    >
      <input
        {...restProps}
        ref={ref}
        max={max}
        min={min}
        maxLength={money ? 20 : maxLength}
        minLength={minLength}
        dir={money ? "ltr" : dir}
        type={money ? "text" : restProps.type}
        onChange={handleChange}
        value={displayValue ?? ""}
        className={clsx(
          "disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent",
          "[[readonly]]:bg-slate-100 [[readonly]]:cursor-not-allowed [[readonly]]:dark:bg-darkmode-800/50 [[readonly]]:dark:border-transparent",
          "transition duration-200 ease-in-out w-full text-sm border-slate-300/60 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-1 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80",
          props.formInputSize == "sm" && "text-xs py-1.5 px-2",
          props.formInputSize == "lg" && "text-lg py-1.5 px-4",
          props.rounded && "rounded-full",
          inputGroup &&
            "rounded-none not-first:border-s-transparent first:rounded-s last:rounded-e z-10",
          className,
          {
            "border! border-destructive!": hasError,
          },
        )}
      />

      {/* بخش نمایش حروف */}
      {money && valueInWords && (
        <span
          className="text-[13px] text-success mt-1 p-1 px-1 font-medium italic animate-in fade-in slide-in-from-top-1 text-right"
          dir="rtl"
        >
          {String(valueInWords)} تومان
        </span>
      )}
    </div>
  );
});

export default FormInput;
