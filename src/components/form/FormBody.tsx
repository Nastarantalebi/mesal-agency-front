import type { Control, FieldValues } from "react-hook-form";
import type { Items } from "./FormInputTypes";
import formTypes from "./FormInputTypes";

interface Props<TFormValues extends FieldValues> {
    fields?: Items<TFormValues>[];
    control: Control<TFormValues, any, TFormValues>;
}

const FormBody = <TFormValues extends FieldValues>({fields, control}: Props<TFormValues>) => {
  return (
    <>
      {fields?.map((item) => (
        <div key={String(item.name)} className={item.className || "col-span-1 mb-2"}>
          {formTypes<TFormValues>(item, control)}
        </div>
      ))}
    </>
  );
};

export default FormBody;
