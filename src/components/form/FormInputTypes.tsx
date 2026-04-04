import { type Item } from "@/app/AdminPanel/Accommodation/types/index";
import CustomInput, { type InputType } from "./CustomInput";
import CustomCombobox from "./CustomCombobox";
import type { Control, FieldValues, Path } from "react-hook-form";
import YesNoInput from "./YesNoInput";
import DateInput from "./DateInput";
import CustomCheckbox from "./CustomCheckbox";
import CustomMapPicker from "./Map";
import TimeInput from "./TimeInput";

export interface Items<T> {
  name: Path<T>;
  label: string;
  fieldType?: string;
  isRequired: boolean;
  options?: Item[];
  inputType?: InputType;
  valueAsNumber?: boolean;
  onValueChange?: (value: string | number) => void;
  className?: string;
  page?: number;
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
  }: Items<T>,
  control: Control<T>,
) {
  switch (fieldType) {
    case "dropdown":
      return (
        <CustomCombobox<T>
          name={name}
          placeholder={label}
          label={label}
          items={options}
          isRequired={isRequired}
          onValueChange={onValueChange}
          control={control}
        />
      );

    case "input":
      return (
        <CustomInput
          name={name}
          placeholder={label}
          label={label}
          isRequired={isRequired}
          inputType={inputType}
          control={control}
        />
      );

    case "yesNoInput":
      return (
        <YesNoInput
          name={name}
          label={label}
          isRequired={isRequired}
          control={control}
        />
      );

    case "DatePicker":
      return (
        <DateInput
          name={name}
          label={label}
          isRequired={isRequired}
          control={control}
        />
      );

    case "checkBox":
      return (
        <CustomCheckbox
          name={name}
          label={label}
          isRequired={isRequired}
          control={control}
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
        />
      );
  }
}

export default formTypes;
