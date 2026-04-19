import { type Item } from "@/app/AdminPanel/Accommodation/types/index";
import CustomInput, { type InputType } from "./CustomInput";
import CustomCombobox from "./CustomCombobox";
import type { Control, FieldValues, Path } from "react-hook-form";
import YesNoInput from "./YesNoInput";
import DateInput from "./DateInput";
import CustomCheckbox from "./CustomCheckbox";
import CustomMapPicker from "./Map";
import TimeInput from "./TimeInput";
import type { ReactNode } from "react";


type fieldTypes = "dropdown" | "input" | "yesNoInput" | "DatePicker" | "checkBox" | "Map" | "Time";
export interface Items<T> {
  name: Path<T>;
  label?: string;
  fieldType?: fieldTypes;
  isRequired: boolean;
  options?: Item[];
  inputType?: InputType;
  valueAsNumber?: boolean;
  onValueChange?: (value: string | number) => void;
  className?: string;
  page?: number;
  maxLength?: number;
  icon?: ReactNode;
  direction?: string;
  placeholder?: string;
}

function formTypes<T extends FieldValues>(
  {
    name,
    label,
    fieldType,
    isRequired,
    options,
    inputType,
    onValueChange,
    maxLength,
    icon,
    direction,
    placeholder,
    className,
  }: Items<T>,
  control: Control<T>,
) {
  switch (fieldType) {
    case "dropdown":
      return (
        <CustomCombobox<T>
          name={name}
          placeholder={placeholder}
          label={label}
          items={options}
          isRequired={isRequired}
          onValueChange={onValueChange}
          control={control}
          className= {className}
        />
      );

    case "input":
      return (
        <CustomInput
          name={name}
          placeholder={placeholder}
          label={label}
          isRequired={isRequired}
          inputType={inputType}
          control={control}
          maxLength={maxLength}
          icon={icon}
          direction={direction}
          className={className}
        />
      );

    case "yesNoInput":
      return (
        <YesNoInput
          name={name}
          label={label}
          isRequired={isRequired}
          control={control}
          className={className}
        />
      );

    case "DatePicker":
      return (
        <DateInput
          name={name}
          label={label}
          placeholder={placeholder}
          isRequired={isRequired}
          control={control}
          className={className}
        />
      );

    case "checkBox":
      return (
        <CustomCheckbox
          name={name}
          label={label}
          isRequired={isRequired}
          control={control}
          className={className}
        />
      );

    case "Map":
      return <CustomMapPicker label="موقعیت مکانی" isRequired />;

    case "Time":
      return <TimeInput name={name} label={label} isRequired={isRequired} control={control}/>

    default:
      return (
        <CustomInput
          name={name}
          placeholder={label}
          label={label}
          isRequired={isRequired}
          inputType={inputType}
          control={control}
          className={className}
        />
      );
  }
}

export default formTypes;
