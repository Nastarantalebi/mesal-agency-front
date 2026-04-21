import {
  Combobox,
  ComboboxContent,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { Label } from "../ui/label";
import { Controller, type FieldValues } from "react-hook-form";
import type { Props } from "./PropsType";

const CustomCombobox = <T extends FieldValues>({
  name,
  label,
  items,
  isRequired,
  onValueChange,
  control,
  placeholder,
  className,
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
          
          // ----- FIND THE SELECTED ITEM -----
          const selectedItem = items?.find((item) => {
            if ("value" in item) {
              // type: { label, value }
              return String(item.value) === String(field.value ?? "");
            }
            // type: { id, name }
            return String(item.id) === String(field.value ?? "");
          });

          // ----- TEXT TO SHOW IN THE INPUT -----
          const selectedText =
            selectedItem
              ? ("label" in selectedItem
                  ? selectedItem.label
                  : selectedItem.name)
              : "";

          return (
            <Combobox value={String(field.value ?? "")}>
              <ComboboxInput
                value={selectedText}
                readOnly
                placeholder={placeholder}
                className={`${fieldState.error ? "border-red-600" : `${className}`}`}
              />

              <ComboboxContent>
                <ComboboxList>
                  {items?.map((item) => {
                    
                    // The value of the item depending on its shape
                    const value =
                      "value" in item
                        ? String(item.value)
                        : String(item.id);

                    // Text shown inside the list
                    const label =
                      "label" in item
                        ? item.label
                        : item.name;

                    return (
                      <ComboboxItem
                        key={value}
                        value={value}
                        onClick={() => {
                          field.onChange(value);
                          onValueChange?.(value);
                        }}
                      >
                        {label}
                      </ComboboxItem>
                    );
                  })}
                </ComboboxList>
              </ComboboxContent>

              {fieldState.error && (
                <p className="text-sm font-medium text-destructive mt-1">
                  {fieldState.error.message}
                </p>
              )}
            </Combobox>
          );
        }}
      />
    </div>
  );
};

export default CustomCombobox;
