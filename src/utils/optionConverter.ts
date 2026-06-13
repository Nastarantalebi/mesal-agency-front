// utils/optionConverters.ts

import type { TOption, TOption2 } from "@/types";

export function convertTOption2ToTOption(option: TOption2): TOption {
  return {
    label: option.name,
    value: String(option.id),
    ...(option.children && {
      children: option.children.map(convertTOption2ToTOption),
    }),
  };
}

export function normalizeOptions(
  options: TOption[] | TOption2[]
): TOption[] {
  if (options.length === 0) return [];

  // Type guard: check if first item is TOption2
  if (isTOption2Array(options)) {
    return options.map(convertTOption2ToTOption);
  }

  return options as TOption[];
}

// Type guards
export function isTOption2(option: TOption | TOption2): option is TOption2 {
  return "id" in option && "name" in option;
}

export function isTOption2Array(
  options: TOption[] | TOption2[]
): options is TOption2[] {
  return options.length > 0 && isTOption2(options[0]);
}