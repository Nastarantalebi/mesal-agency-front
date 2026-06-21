import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { PlusIcon } from "lucide-react";
import { useState, useEffect } from "react";
import type { ControllerRenderProps, FieldValues, Path } from "react-hook-form";

type TagsInputProps<TFormValues extends FieldValues> = {
  field: ControllerRenderProps<TFormValues, Path<TFormValues>>;
  placeholder?: string;
  inputClassName?: string;
  containerClassName?: string;
  hasError?: boolean;
};

export default function TagsInput<TFormValues extends FieldValues>({
  field,
  placeholder = "اضافه کردن ویژگی...",
  inputClassName,
  containerClassName,
  hasError,
}: TagsInputProps<TFormValues>) {
  const { value = [], onChange } = field;

  const [tags, setTags] = useState<string[]>(Array.isArray(value) ? value : []);
  const [input, setInput] = useState("");

  // ⚡ هماهنگ‌سازی با مقدار فرم
  useEffect(() => {
    if (Array.isArray(value)) {
      setTags(value);
    }
  }, [value]);

  const addTag = (tag: string) => {
    const trimmed = tag.trim();
    if (!trimmed || tags.includes(trimmed)) return;
    const newTags = [...tags, trimmed];
    setTags(newTags);
    onChange(newTags); // update react-hook-form
    setInput("");
  };

  const removeTag = (index: number) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
    onChange(newTags);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag(input);
    }
  };

  return (
    <div className={clsx("flex flex-col gap-1", containerClassName)}>
      {/* input row */}
      <div className="flex items-center gap-2 border rounded-md  px-2 py-1 min-h-10 bg-white dark:bg-neutral-800">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={clsx(
            "flex-1 border-none outline-none bg-transparent text-sm h-10 px-1", // ارتفاع ثابت h-10
            inputClassName,
            {
              "border! border-destructive!": hasError,
            },
          )}
        />
        <Button
          type="button"
          variant="destructive"
          onClick={() => addTag(input)}
        >
          <PlusIcon className=" w-4 h-4" />
        </Button>
      </div>

      {/* tags زیر input */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-1">
          {tags.map((tag, index) => (
            <div
              key={index}
              className="flex items-center gap-1 bg-blue-500 text-white px-2 py-1 rounded-md text-sm"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(index)}
                className="ml-1 text-white font-bold hover:text-gray-200"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
