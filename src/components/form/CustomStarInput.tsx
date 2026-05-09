import { Controller, type FieldValues } from "react-hook-form";
import type { Props } from "./PropsType";

const CustomStarInput = <T extends FieldValues>({
  name,
  label,
  control,
}: Props<T>) => {
  return (
    <div>
      {label && <p className="mb-1">{label}</p>}

      <Controller
        name={name}
        control={control}
        // defaultValue={0}
        render={({ field }) => (
          <div className="flex gap-1 text-2xl cursor-pointer">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => field.onChange(star)}
                className={
                  star <= field.value ? "text-yellow-400" : "text-gray-300"
                }
              >
                ★
              </span>
            ))}
          </div>
        )}
      />
    </div>
  );
};

export default CustomStarInput;
