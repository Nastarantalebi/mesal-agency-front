import CustomInput, { type InputType } from "./CustomInput";
import CustomCombobox from "./CustomCombobox";
import type { Control, FieldValues, Path } from "react-hook-form";
import YesNoInput from "./YesNoInput";
import DateInput from "./DateInput";
import CustomCheckbox from "./CustomCheckbox";
import CustomMapPicker from "./Map";
import TimeInput from "./TimeInput";
import type { ReactNode } from "react";
import Radio from "./RadioInputs";
import type { Type } from "@/app/AdminPanel/Accommodation/types";
import CustomImageInput from "./CustomImageInput";

type fieldTypes =
  | "dropdown"
  | "input"
  | "yesNoInput"
  | "DatePicker"
  | "checkBox"
  | "Map"
  | "Time"
  | "radio"
  | "image";
export interface Items<T> {
  name: Path<T>;
  label?: string;
  fieldType?: fieldTypes;
  isRequired?: boolean;
  inputType?: InputType;
  valueAsNumber?: boolean;
  onValueChange?: (value: string | number) => void;
  className?: string;
  page?: number;
  maxLength?: number;
  icon?: ReactNode;
  direction?: string;
  placeholder?: string;
  items?: Type[];
  imageUrl?: string | null;
}

function formTypes<T extends FieldValues>(
  {
    name,
    label,
    fieldType,
    isRequired,
    inputType,
    onValueChange,
    maxLength,
    icon,
    direction,
    placeholder,
    className,
    items,
    imageUrl,
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
          items={items}
          isRequired={isRequired}
          onValueChange={onValueChange}
          control={control}
          className={className}
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
    case "radio":
      return (
        <Radio
          name={name}
          label={label}
          isRequired={isRequired}
          control={control}
          className={className}
          items={items}
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
      return <CustomMapPicker label="موقعیت مکانی" isRequired={isRequired} />;

    case "Time":
      return (
        <TimeInput
          name={name}
          label={label}
          isRequired={isRequired}
          control={control}
        />
      );

    case "image":
      return (
        <CustomImageInput
          name={name}
          label={label}
          control={control}
          isRequired={isRequired}
          imageUrl={imageUrl}
        />
      );

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
