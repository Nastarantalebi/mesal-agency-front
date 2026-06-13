import Select, {
  type CSSObjectWithLabel,
  type MultiValue,
  type SingleValue,
} from "react-select";
import type { ControllerRenderProps } from "react-hook-form";
import clsx from "clsx";

export type SelectOption = {
  label: string;
  value: string | number | boolean;
};

type BaseProps = {
  options: SelectOption[];
  placeholder?: string;
  isSearchable?: boolean;
  isClearable?: boolean;
  isDisabled?: boolean;
  hasError?: boolean;
  mode?: "multiple" | "single";
  className?: string;
};

type RHFProps = {
  field: ControllerRenderProps<any, any>;
  value?: never;
  onChange?: (option: SelectOption | SelectOption[] | null) => void;
};

type ControlledProps = {
  field?: never;
  value: SelectOption | SelectOption[] | null;
  onChange: (option: SelectOption | SelectOption[] | null) => void;
};

type AppSelectProps = BaseProps & (RHFProps | ControlledProps);

export default function ReactSelect({
  options,
  placeholder = "انتخاب کنید",
  isSearchable = true,
  isClearable = true,
  isDisabled = false,
  hasError,
  className,
  mode = "single",
  ...props
}: AppSelectProps) {
  const isMulti = mode === "multiple";

  const style = {
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
    option: SingleValue<SelectOption> | MultiValue<SelectOption>
  ) => {
    if (isMulti) {
      const vals = (option as MultiValue<SelectOption>).map((o) => o.value);
      if ("field" in props) props.field?.onChange(vals);
      else props.onChange(vals as any);
    } else {
      const val = (option as SingleValue<SelectOption>)?.value ?? null;
      if ("field" in props) props.field?.onChange(val);
      else props.onChange(val as any);
    }
  };

  // حالت RHF
  if ("field" in props) {
    const { field } = props;

    const selectedOption = isMulti
      ? options.filter((opt) =>
          Array.isArray(field?.value) ? field.value.includes(opt.value) : false
        )
      : options.find((opt) => opt.value === field?.value) ?? null;

    return (
      <Select
        menuPortalTarget={document.body}
        menuPosition="fixed"
        options={options}
        value={selectedOption}
        onChange={handleChange}
        placeholder={placeholder}
        isSearchable={isSearchable}
        isClearable={isClearable}
        isDisabled={isDisabled}
        isMulti={isMulti}
        styles={style}
        isRtl
        classNamePrefix="simple-select"
        className={clsx("rounded-md", className, {
          "border! border-danger!": hasError,
        })}
        loadingMessage={() => "در حال بارگذاری..."}
        noOptionsMessage={({ inputValue }) =>
          inputValue ? "نتیجه‌ای پیدا نشد" : "گزینه‌ای وجود ندارد"
        }
      />
    );
  }

  // حالت Controlled
  return (
    <Select
      menuPortalTarget={document.body}
      menuPosition="fixed"
      options={options}
      value={props.value}
      onChange={handleChange}
      placeholder={placeholder}
      isSearchable={isSearchable}
      isClearable={isClearable}
      isDisabled={isDisabled}
      isMulti={isMulti}
      isRtl
      styles={style}
      classNamePrefix="simple-select"
      className={clsx("rounded-md", className, {
        "!border !border-danger": hasError,
      })}
      loadingMessage={() => "در حال بارگذاری..."}
      noOptionsMessage={({ inputValue }) =>
        inputValue ? "نتیجه‌ای پیدا نشد" : "گزینه‌ای وجود ندارد"
      }
    />
  );
}
