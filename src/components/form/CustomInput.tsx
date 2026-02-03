import { FormField } from "../ui/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import type { FieldValues } from "react-hook-form";
import type { Props } from "./PropsType";

export type InputType = "text" | "number" | "email" | "password" | "tel";


const CustomInput = <T extends FieldValues,>({
  name,
  label,
  isRequired,
  inputType = "text",
  control,
}: Props<T>) => {
  return (
    <div className="min-w-0 w-full">
      <Label className="block mb-3 mr-3">
        {label}
        {isRequired && <span className="text-red-600">*</span>}
      </Label>

      <FormField
        name={name}
        control={control}
        render={({ field }) => (
          <Input {...field} type={inputType} />
        )}
      />
    </div>
  );
};

export default CustomInput;
