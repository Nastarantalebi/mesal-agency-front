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
          const selectedItem = items?.find((item) => {
            if (typeof item === "string") {
              return item === String(field.value ?? "");
            }
            return String(item.value ?? item.id) === String(field.value ?? "");
          });

          const selectedText =
            typeof selectedItem === "string"
              ? selectedItem
              : (selectedItem?.label ?? selectedItem?.name ?? "");

          return (
            <Combobox value={String(field.value ?? "")}>
              <ComboboxInput
                value={selectedText}
                readOnly
                className={`${fieldState.error ? "border-red-600" : "border border-primary/50 "}`}
              />

              <ComboboxContent>
                <ComboboxList>
                  {items?.map((item) => {
                    // Type guard: check if item is a string
                    if (typeof item === "string") {
                      return (
                        <ComboboxItem
                          key={item}
                          value={item}
                        >
                          {item}
                        </ComboboxItem>
                      );
                    }

                    // Now TypeScript knows item is an Item object
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
                        {item.label ?? item.name}
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
