import {
  Combobox,
  ComboboxContent,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { Label } from "../ui/label";
import { FormMessage } from "../ui/form";
import { Controller, type FieldValues } from "react-hook-form";
import type { Props } from "./PropsType";


const CustomCombobox = <T extends FieldValues>({
  name,
  label,
  items,
  isRequired,
  onValueChange,
  control,
}: Props<T>) => {
  return (
    <div className="w-full min-w-0">
      <Label className="block mb-3 mr-3">
        {label}
        {isRequired && <span className="text-red-600">*</span>}
      </Label>

      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => {
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
                value={selectedText}
                readOnly
                className={`${fieldState.error ? "border-red-600" : ""}`}
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
              <FormMessage/>
            </Combobox>
          );
        }}
      />
    </div>
  );
}

export default CustomCombobox;
