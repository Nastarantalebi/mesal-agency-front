import clsx from "clsx";
import React from "react";
import type { ControllerRenderProps, FieldValues, Path } from "react-hook-form";

type NativeTextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

type TProps<TFormValues extends FieldValues> = {
  field: ControllerRenderProps<TFormValues, Path<TFormValues>>;
  hasError?: boolean;
  inputClassName?: string;
  resize?: "none" | "both" | "horizontal" | "vertical";
  button?: React.ReactNode;
  rowIndex?: number;
} & Omit<NativeTextAreaProps, "onChange" | "name" | "value">;

function CustomTextArea<TFormValues extends FieldValues>({
  field,
  hasError,
  inputClassName,
  resize = "vertical",
  button,
  rowIndex,
  ...props
}: TProps<TFormValues>) {
  const { name, value, onChange } = field;

  return (
    <div className="flex w-full items-end gap-x-2">
      <textarea
        data-rowindex={rowIndex}
        id={name}
        name={name}
        value={value ?? ""}
        onChange={onChange}
        style={{ resize }}
        className={clsx(
          "flex h-10 w-full rounded-md border border-slate-300/60 bg-background px-3 py-2 text-sm shadow-sm",
          "placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 !resize-none",
          "focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          hasError && "border-destructive focus-visible:ring-destructive",
          inputClassName,
        )}
        {...props}
      />
      {button}
    </div>
  );
}

export default CustomTextArea;
