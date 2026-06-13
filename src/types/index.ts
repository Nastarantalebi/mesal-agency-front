import type { SelectOption } from "@/_components/Form/FormSelect/ReactSelect";
import type { FieldValues, Path } from "react-hook-form";
import type { DateObject } from "react-multi-date-picker";

export type TPaginatedResponse<T> = {
    count: number,
    next: null,
    previous: null,
    results : T[]
}

export type TOption = {
    label: string,
    value: string | boolean,
    children?: TOption[],
}
export type TOption2 ={
  id: number,
  name: string,
  children?: TOption2[],
}

export type TFormData<T extends FieldValues> = {
  name: Path<T> | "separator" | "empty";
  label?: string;
  placeholder?: string;
  type?:
    | "select"
    | "treeSelect"
    | "checkbox"
    | "switch"
    | "radio"
    | "date"
    | "month"
    | "time"
    | "textWithAlignment"
    | "textArea"
    | "upload"
    | "image"
    | "tags"
    | "map"
    | null;
  // You can add any other prop that your custom components might need
  option?: TOption[] | TOption2[] ;
  mode?: "single" | "multiple";
  money?: boolean;
  required?: boolean;
  className?: string;
  popupClassName?: string;
  isLoading?: boolean;
  onValue?: number | boolean | string;
  offValue?: number | boolean | string;
  dir?: "rtl" | "ltr";
  // value?: string | boolean | number;
  readOnly?: boolean;
  text?: string;
  more?: boolean;
  inputType?: "text" | "number" | "password" | "email" | "tel";
  onChangeSelect?: (
    value?:
      | (string | number | boolean)
      | (string | number | boolean)[]
      | undefined,
    option?: TOption | TOption[],
  ) => void;
  onChange?: (
    value: string | number | boolean | null | (string | number | boolean)[],
    option?: SelectOption | SelectOption[] | null,
  ) => void;
  showTimePicker?: boolean;
  showValueInWord?: boolean;
  min?: number;
  max?: number;
  maxLength?: number;
  minLength?: number;
  maxDate?: DateObject | null;
  minDate?: DateObject | null;
  mask?: string;
  inputClassName?: string;
  inFiscalYear?: boolean;
  info?: string;
  format?: string;
  onSearch?: (query: string) => void;
  defaultLabel?: string;
  disabled?: boolean;
  onKeyDown?: (event: React.KeyboardEvent<HTMLElement>) => void;
  autoFocus?: boolean;
  medium_url?: string;
  original_url?: string;
  portal?: boolean;
  // maxSelectDate?: DateObject | null;
  // onClick?: MouseEventHandler<HTMLButtonElement>;
  // prefix?: ReactNode;
};

// export type TColumns = {
//   label: string;
//   sortable: boolean;
//   filterable: boolean;
//   visible: boolean;
//   type: string;
// };

// export type TPaginate = {
//   current_page: number;
//   per_page: number;
//   total: number;
//   last_page: number;
//   has_more: boolean;
// };
