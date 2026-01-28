import type { Item } from "@/app/AdminPanel/Accommodation/types";

import {
  Combobox,
  ComboboxContent,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { Label } from "../ui/label";
import { FormField } from "../ui/form";
import type { Control, FieldValues, Path } from "react-hook-form";

interface Props<T extends FieldValues> {
  name: Path<T>;
  placeholder: string;
  label: string;
  isRequired: boolean;
  items?: Item[];
  onValueChange?: (value: string | number) => void;
  control: Control<T>;
}

function CustomCombobox<T extends FieldValues>({
  name,
  placeholder,
  label,
  items,
  isRequired,
  onValueChange,
  control,
}: Props<T>) {
  return (
    <div className="w-56  mr-10">
      <Label className="block mb-3 mr-3">
        {label}
        {isRequired && <span className="text-red-600">*</span>}
      </Label>

      <FormField
        name={name}
        control={control}
        render={({ field }) => {
          const selectedText =
            items?.find(
              (it) => String(it.value ?? it.id) === String(field.value ?? ""),
            )?.label ??
            items?.find(
              (it) => String(it.value ?? it.id) === String(field.value ?? ""),
            )?.name ??
            "";

          return (
            <Combobox value={String(field.value ?? "")}>
              <ComboboxInput
                placeholder={placeholder}
                value={selectedText}
                readOnly
              />

              <ComboboxContent>
                <ComboboxList>
                  {items?.map((item) => {
                    const v = String(item.value ?? item.id);
                    return (
                      <ComboboxItem
                        key={v}
                        value={v}
                        onClick={() => {
                          field.onChange(v); 
                          onValueChange?.(v);
                        }}
                      >
                        {item.label || item.name}
                      </ComboboxItem>
                    );
                  })}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          );
        }}
      />
    </div>
  );
}

export default CustomCombobox;
