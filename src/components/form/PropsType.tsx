import type { Control, FieldValues, Path } from "react-hook-form";
import type { InputType } from "./CustomInput";
import type { Item } from "@/app/AdminPanel/Accommodation/types";

export interface Props<T extends FieldValues> {
  name: Path<T>;
  placeholder?: string;
  label?: string;
  isRequired?: boolean;
  items?: Item[] | string[];
  inputType?: InputType;
  onValueChange?: (value: string | number) => void;
  control?: Control<T>;
}
