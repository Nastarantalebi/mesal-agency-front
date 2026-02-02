import { Controller, type FieldValues } from "react-hook-form";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import type { Props } from "./PropsType";

function YesNoInput<T extends FieldValues>({
  name,
  label,
  isRequired,
  control,
}: Props<T>) {
  return (
    <div className="w-full min-w-0">
      <Label className="block mb-3 mr-3">
        {label}
        {isRequired && <span className="text-red-600">*</span>}
      </Label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <RadioGroup
            value={field.value}
            onValueChange={field.onChange}
            className="w-fit flex flex-wrap justify-around items-center gap-4 rounded-md border border-input p-2 min-h-5"
          >
            <div className="flex items-center gap-3">
              <RadioGroupItem value="true" id="r1" />
              <Label htmlFor="r1">بله</Label>
              <RadioGroupItem value="false" id="r2" />
              <Label htmlFor="r2">خیر</Label>
            </div>
          </RadioGroup>
        )}
      />
    </div>
  );
}

export default YesNoInput;
