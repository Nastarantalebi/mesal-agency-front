import { Controller, type FieldValues } from "react-hook-form";
import { useEffect, useState } from "react";
import type { Props } from "./PropsType";
import { Label } from "../ui/label";

const CustomImageInput = <T extends FieldValues>({
  name,
  control,
  label,
  isRequired,
}: Props<T>) => {
  const [preview, setPreview] = useState<string | null>(null);

  console.log(isRequired);

  return (
    <>
      <Label className="block my-2">
        {label}
        {isRequired && <span className="text-red-600">*</span>}
      </Label>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => {
          // ایجاد preview بدون memory leak
          useEffect(() => {
            if (!field.value) {
              setPreview(null);
              return;
            }
            const file = field.value as File;
            const objectUrl = URL.createObjectURL(file);
            setPreview(objectUrl);

            return () => URL.revokeObjectURL(objectUrl);
          }, [field.value]);

          const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0] ?? null;
            field.onChange(file);
          };

          const clearImage = () => field.onChange(null);

          return (
            <div className="flex flex-col gap-2">
              <div
                className="
                relative w-52 h-52 
                border border-gray-300 rounded-lg 
                overflow-hidden cursor-pointer 
                flex items-center justify-center
                bg-gray-50 hover:bg-gray-100
              "
                onClick={() =>
                  document.getElementById(`file-input-${name}`)?.click()
                }
              >
                {!preview && (
                  <span className="text-gray-500 text-sm">انتخاب عکس</span>
                )}

                {preview && (
                  <img
                    src={preview}
                    alt="preview"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}

                {/* لایه محو برای حذف عکس */}
                {preview && (
                  <div
                    className="
                    absolute inset-0 bg-black/40 opacity-0 
                    hover:opacity-100 transition-opacity
                    flex items-center justify-center
                  "
                  >
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        clearImage();
                      }}
                      className="text-white bg-red-500 px-3 py-1 rounded-md"
                    >
                      حذف
                    </button>
                  </div>
                )}

                <input
                  id={`file-input-${name}`}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleChange}
                />
              </div>

              {fieldState.error && (
                <span className="text-sm text-red-600">
                  {fieldState.error.message}
                </span>
              )}
            </div>
          );
        }}
      />
    </>
  );
};

export default CustomImageInput;
