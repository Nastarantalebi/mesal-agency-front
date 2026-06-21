import Select, {
  type CSSObjectWithLabel,
  type MultiValue,
  type SingleValue,
} from "react-select";
import type { ControllerRenderProps } from "react-hook-form";
import clsx from "clsx";
import { cn } from "@/lib/utils";
import type { TOption, TOption2 } from "@/types";


// Internal normalized shape react-select works with
export type SelectOption = {
  label: string;
  value: string | number | boolean;
};

// ─── Type Guards ─────────────────────────────────────────────────────────────

function isTOption2Array(options: TOption[] | TOption2[]): options is TOption2[] {
  return options.length > 0 && "id" in options[0];
}

// ─── Normalizer ───────────────────────────────────────────────────────────────

function normalizeOptions(options: TOption[] | TOption2[]): SelectOption[] {
  if (options.length === 0) return [];

  if (isTOption2Array(options)) {
    return options.map((o) => ({ label: o.name, value: o.id }));
  }

  return options.map((o) => ({ label: o.label, value: o.value }));
}

// ─── Props ───────────────────────────────────────────────────────────────────

type BaseProps = {
  options: TOption[] | TOption2[];
  placeholder?: string;
  isSearchable?: boolean;
  isClearable?: boolean;
  isDisabled?: boolean;
  hasError?: boolean;
  mode?: "multiple" | "single";
  inputClassName?: string;
  autoFocus?: boolean;
  inputId?: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLElement>) => void;
  ref?: React.Ref<any>;
  rowIndex?: number;
};

type RHFProps = {
  field: ControllerRenderProps<any, any>;
  value?: never;
  onChange?: (
    value: boolean | string | number | null | (boolean | string | number)[],
    option: SelectOption | SelectOption[] | null,
  ) => void;
};

type ControlledProps = {
  field?: never;
  value: SelectOption | SelectOption[] | null;
  onChange?: (
    value: boolean | string | number | null | (boolean | string | number)[],
    option: SelectOption | SelectOption[] | null,
  ) => void;
};

type AppSelectProps = BaseProps & (RHFProps | ControlledProps);

// ─── Component ───────────────────────────────────────────────────────────────

export default function ReactSelect({
  options,
  placeholder = "انتخاب کنید",
  isSearchable = true,
  isClearable = true,
  isDisabled = false,
  hasError,
  inputClassName,
  autoFocus,
  ref,
  onKeyDown,
  mode = "single",
  rowIndex,
  ...props
}: AppSelectProps) {
  const isMulti = mode === "multiple";
  const normalizedOptions = normalizeOptions(options);

  const styles = {
    menuPortal: (base: CSSObjectWithLabel) => ({ ...base, zIndex: 9999 }),
    placeholder: (base: CSSObjectWithLabel) => ({
      ...base,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    }),
    valueContainer: (base: CSSObjectWithLabel) => ({
      ...base,
      whiteSpace: "nowrap",
      overflow: "hidden",
    }),
    singleValue: (base: CSSObjectWithLabel) => ({
      ...base,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    }),
  };

  const handleChange = (
    option: SingleValue<SelectOption> | MultiValue<SelectOption>,
  ) => {
    if (isMulti) {
      const vals = (option as MultiValue<SelectOption>).map((o) => o.value);
      if ("field" in props) props.field?.onChange(vals);
      props.onChange?.(vals, option as SelectOption[]);
    } else {
      const val = (option as SingleValue<SelectOption>)?.value ?? null;
      if ("field" in props) props.field?.onChange(val);
      props.onChange?.(val, option as SingleValue<SelectOption>);
    }
  };

  const sharedProps = {
    menuPortalTarget: document.body,
    menuPosition: "fixed" as const,
    options: normalizedOptions,
    ref,
    "data-select-trigger": true,
    onChange: handleChange,
    placeholder,
    isSearchable,
    isClearable,
    isDisabled,
    isMulti,
    isRtl: true,
    styles,
    classNamePrefix: "simple-select",
    loadingMessage: () => "در حال بارگذاری...",
    noOptionsMessage: ({ inputValue }: { inputValue: string }) =>
      inputValue ? "نتیجه‌ای پیدا نشد" : "گزینه‌ای وجود ندارد",
  };

  // ── RHF mode ──
  if ("field" in props) {
    const { field } = props;

    const selectedOption = isMulti
      ? normalizedOptions.filter((opt) =>
          Array.isArray(field?.value) ? field.value.includes(opt.value) : false,
        )
      : (normalizedOptions.find((opt) => opt.value === field?.value) ?? null);

    return (
      <Select
        {...sharedProps}
        tabIndex={0}
        autoFocus={autoFocus}
        data-rowindex={rowIndex}
        value={selectedOption}
        className={cn("rounded-md", inputClassName, {
          "border! border-destructive!": hasError,
        })}
      />
    );
  }

  // ── Controlled mode ──
  return (
    <Select
      {...sharedProps}
      value={props.value}
      className={clsx("rounded-md", inputClassName, {
        "border! border-destructive!": hasError,
      })}
    />
  );
}