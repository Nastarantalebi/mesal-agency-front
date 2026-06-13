import clsx from "clsx";
import { useEffect, useState } from "react";

type AccessSwitchProps = {
  checked?: boolean; // ✅ برای حالت controlled
  defaultChecked?: boolean;
  onChange?: (isOn: boolean) => void;
  label?: string;
};

const AccessSwitch: React.FC<AccessSwitchProps> = ({
  checked,
  defaultChecked = false,
  onChange,
  label,
}) => {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);

  // اگر parent checked بده، internal state هم هماهنگ بشه
  useEffect(() => {
    if (typeof checked === "boolean") {
      setInternalChecked(checked);
    }
  }, [checked]);

  const toggle = () => {
    const newValue = !internalChecked;
    setInternalChecked(newValue);
    onChange?.(newValue);
  };

  return (
    <div
      className={clsx(
        "flex items-center space-x-3 mb-2 rounded-md justify-between p-2",
        {
          "bg-gray-200": label,
        }
      )}
      dir="rtl">
      {label && <span className="text-sm font-medium">{label}</span>}
      <button
        onClick={toggle}
        className={`relative w-14 h-7 flex items-center rounded-full p-1 duration-300 ease-in-out
          ${
            internalChecked
              ? "bg-green-500 justify-end"
              : "bg-gray-300 justify-start"
          }`}>
        <div className="w-5 h-5 rounded-full bg-white shadow-md transform duration-300 ease-in-out" />
      </button>
    </div>
  );
};

export default AccessSwitch;
