import * as React from "react";
import { ImageIcon } from "lucide-react";

type PhotoUploaderProps = {
  size?: number;
  onPick: (file: File) => void; // ✅ single file
  accept?: string;
  disabled?: boolean;
};

export default function PhotoUploader({
  size = 260,
  onPick,
  accept = "image/*",
  disabled = false,
}: PhotoUploaderProps) {
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = React.useState<string | null>(null);

  const openPicker = () => {
    if (!disabled) inputRef.current?.click();
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={false} 
        disabled={disabled}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (!file) return;

          const url = URL.createObjectURL(file);
          setPreview((old) => {
            if (old) URL.revokeObjectURL(old);
            return url;
          });
          onPick(file); 
          e.target.value = ""; 
        }}
      />

      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        onClick={openPicker}
        onKeyDown={(e) => {
          if (disabled) return;
          if (e.key === "Enter" || e.key === " ") openPicker();
        }}
        style={{ width: size, height: size }}
        className={[
          "border-4 border-dashed rounded-2xl",
          "flex flex-col items-center justify-center gap-2 transition",
          disabled
            ? "opacity-60 cursor-not-allowed"
            : "cursor-pointer hover:bg-accent/30 focus:outline-none focus:ring-2 focus:ring-ring",
        ].join(" ")}
      >
        {preview ? (
          <img
            src={preview}
            alt="Selected"
            className="w-full h-full object-cover rounded-2xl"
          />
        ) : (
          <>
            <ImageIcon className="h-6 w-6 flex justify-center items-center" />
            <span className="text-sm flex justify-center items-center text-center">برای افزودن عکس کلیک کنید</span>
          </>
        )}
      </div>
    </>
  );
}
