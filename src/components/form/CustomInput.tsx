import { FormField } from "../ui/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import type { Control, FieldValues, Path } from "react-hook-form";

export type InputType = "text" | "number" | "email" | "password" | "tel";

interface Props<T extends FieldValues> {
  name: Path<T>;
  placeholder: string;
  label: string;
  isRequired: boolean;
  inputType?: InputType;
  onValueChange?: (value: string | number) => void;
  control: Control<T>; 
}

const CustomInput = <T extends FieldValues,>({
  name,
  placeholder,
  label,
  isRequired,
  inputType = "text",
  control,
}: Props<T>) => {
  return (
    <div className="mr-10 w-full">
      <Label className="block mb-3 mr-3">
        {label}
        {isRequired && <span className="text-red-600">*</span>}
      </Label>

      <FormField
        name={name}
        control={control}
        render={({ field }) => (
          <Input {...field} type={inputType} placeholder={placeholder} />
        )}
      />
    </div>
  );
};

export default CustomInput;
