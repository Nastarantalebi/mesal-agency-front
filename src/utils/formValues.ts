import type { TOption, TOption2 } from "@/types";

export function convertNullToEmptyString<T extends object>(
  obj: T,
  initialValues: T
): T {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const newObject: any = {};

  for (const key in obj) {
    const value = obj[key];
    if (value === null) {
      newObject[key] = initialValues[key] === null ? null : "";
    } else {
      newObject[key] = value;
    }
  }

  return newObject;
}

export function whitelistObjectUsingInitialValues<T extends object>(
  initialValues: T,
  values?: object
): T {
  if (!values) return initialValues;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const combined: any = { ...initialValues, ...values };

  return Object.keys(initialValues).reduce((obj, key) => {
    obj[key] = combined[key];
    return obj;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }, {} as any);
}

export function prepareFormValues<T extends object>(
  initialValues: T,
  values?: object
) {
  return convertNullToEmptyString(
    whitelistObjectUsingInitialValues(initialValues, values),
    initialValues
  );
}

function tOption2ToTOption(option: TOption2): TOption {
  return {
    value: String(option.id),
    label: option.name,
    children: option.children?.map(tOption2ToTOption),
  };
}

export function mapTOption2ToTOption(options: TOption2[]): TOption[] {
  return options?.map(tOption2ToTOption);
}
