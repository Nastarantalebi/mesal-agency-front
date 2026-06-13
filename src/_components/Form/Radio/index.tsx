import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { CircleIcon, Loader2 } from "lucide-react";
import type { ControllerRenderProps, FieldValues, Path } from "react-hook-form";
import type { TOption, TOption2 } from "@/types";
import clsx from "clsx";
import FormLabel from "../FormLabel";
import type { SelectOption } from "../FormSelect/ReactSelect";

// ─── Normalized internal shape ────────────────────────────────────────────────
type NormalizedOption = {
  label: string;
  value: string | number | boolean;
};

// ─── Type guard ───────────────────────────────────────────────────────────────
function isTOption(opt: TOption | TOption2): opt is TOption {
  return "label" in opt && "value" in opt;
}

function normalizeOption(opt: TOption | TOption2): NormalizedOption {
  if (isTOption(opt)) {
    return { label: opt.label, value: opt.value };
  }
  return { label: opt.name, value: opt.id };
}

// ─── Props ────────────────────────────────────────────────────────────────────
type RadioInputProps<TFormValues extends FieldValues> = {
  field: ControllerRenderProps<TFormValues, Path<TFormValues>>;
  option: TOption[] | TOption2[];
  inputClassName?: string;
  itemClassName?: string;
  disabled?: boolean;
  onValueChange?: (
    value: string,
    option?: SelectOption | SelectOption[] | null,
  ) => void;
  rowIndex?: number;
  isLoading?: boolean;
};

// ─── Component ────────────────────────────────────────────────────────────────
function RadioInput<TFormValues extends FieldValues>({
  field,
  option,
  inputClassName,
  itemClassName,
  disabled = false,
  onValueChange,
  isLoading = false,
}: RadioInputProps<TFormValues>) {
  const { name, value, onChange } = field;

  const normalizedOptions = option.map(normalizeOption);

  const handleValueChange = (val: string) => {
    let finalValue: string | number | boolean = val;
    if (typeof value === "boolean") finalValue = val === "true";
    else if (typeof value === "number") finalValue = +val;

    onChange(finalValue);
    onValueChange?.(val);
  };

  return (
    <RadioGroupPrimitive.Root
      name={name}
      disabled={disabled || isLoading}
      value={String(value)}
      onValueChange={handleValueChange}
      dir="rtl"
      className={clsx(
        "flex w-full gap-2 rounded-md border border-gray-300 p-2 h-10!",
        inputClassName,
        {
          "opacity-70 pointer-events-none bg-gray-50": disabled || isLoading,
        },
      )}
    >
      {isLoading ? (
        <div className="flex justify-center w-full py-2">
          <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
        </div>
      ) : (
        normalizedOptions.map((opt) => {
          const isActive = String(value) === String(opt.value);
          return (
            <RadioGroupPrimitive.Item
              key={String(opt.value)}
              value={String(opt.value)}
              id={`${name}-${opt.value}`}
              className={clsx(
                "flex-1 flex items-center gap-2 cursor-pointer p-1",
                itemClassName,
              )}
            >
              <div
                className={clsx(
                  "w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center shrink-0",
                  isActive && "bg-primary border-primary",
                )}
              >
                {isActive && <CircleIcon className="fill-primary size-4" />}
              </div>

              <FormLabel
                htmlFor={`${name}-${opt.value}`}
                className="cursor-pointer text-sm select-none inline-flex items-center"
              >
                {opt.label}
              </FormLabel>
            </RadioGroupPrimitive.Item>
          );
        })
      )}
    </RadioGroupPrimitive.Root>
  );
}

export default RadioInput;