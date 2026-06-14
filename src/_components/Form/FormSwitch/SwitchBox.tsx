import clsx from "clsx";
import type { ControllerRenderProps } from "react-hook-form";

/* ===================== Types ===================== */

type SwitchValue = string | number | boolean;

type BaseProps<T extends SwitchValue> = {
  label?: string;
  disabled?: boolean;
  className?: string;
  onValue: T;
  offValue: T;
};

type RHFProps<T extends SwitchValue> = {
  field: ControllerRenderProps<any, any>;
  value?: T;
  onChange?: never;
};

type ControlledProps<T extends SwitchValue> = {
  field?: never;
  value: T;
  onChange: (value: T) => void;
};

export type SwitchBoxProps<T extends SwitchValue> = BaseProps<T> &
  (RHFProps<T> | ControlledProps<T>);

export default function SwitchBox<T extends SwitchValue>({
  label,
  disabled = false,
  className,
  onValue,
  offValue,
  ...props
}: SwitchBoxProps<T>) {
  const currentValue = "field" in props ? props.field?.value : props.value;

  const isChecked = currentValue === onValue;

  const toggle = () => {
    if (disabled) return;

    const nextValue = isChecked ? offValue : onValue;

    if ("field" in props) {
      props.field?.onChange(nextValue);
    } else {
      props.onChange(nextValue);
    }
  };

  return (
    <div
      dir="rtl"
      className={clsx(
        "flex items-center justify-between p-2 rounded-md",
        { "opacity-50 cursor-not-allowed": disabled },
        className
      )}>
      <button
        type="button"
        onClick={toggle}
        disabled={disabled}
        className={clsx(
          "relative w-14 h-7 flex items-center rounded-full p-1 transition-all cursor-pointer",
          isChecked ? "bg-successw justify-end" : "bg-gray-300 justify-start"
        )}>
        <span className="w-5 h-5 bg-white rounded-full shadow-md transition-transform" />
      </button>
    </div>
  );
}
