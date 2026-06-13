import { createContext } from "react";
import {
  Controller,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
// import { twMerge } from "tailwind-merge";

// type FormFieldProps = React.PropsWithChildren &
//   React.ComponentPropsWithoutRef<"div">;

// eslint-disable-next-line react-refresh/only-export-components
export const FormFieldContext = createContext(false);

function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({ ...props }: ControllerProps<TFieldValues, TName>) {
  return (
    <FormFieldContext.Provider value={true}>
      <Controller {...props} />
      {/* <div
        {...props}
        className={twMerge(["block sm:flex items-center", props.className])}
      >
        {props.children}
      </div> */}
    </FormFieldContext.Provider>
  );
}

export default FormField;
