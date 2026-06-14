import { useEffect, useRef, useState } from "react";
import { Trash2 } from "lucide-react";
import type { ControllerRenderProps } from "react-hook-form";

type ImageFieldProps = {
    field: ControllerRenderProps<any, any>;
    label?: string;
    required?: boolean;
    disabled?: boolean;
    imageUrl?: string | null;
    error?: string;
};

export default function ImageField({
    field,
    disabled,
    imageUrl,
    error,
}: ImageFieldProps) {
    const [preview, setPreview] = useState<string | null>(imageUrl || null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (!field.value) {
            setPreview(imageUrl || null);
            return;
        }

        if (typeof field.value === "string") {
            setPreview(field.value);
            return;
        }

        const file = field.value as File;
        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
    }, [field.value, imageUrl]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        field.onChange(file);
    };

    const clearImage = () => {
        field.onChange(null);
        setPreview(null);

        if (inputRef.current) {
            inputRef.current.value = "";
        }
    };

    return (
        <div className="flex flex-col gap-2">
            <div
                className={`relative w-52 h-52 border rounded-lg overflow-hidden 
        flex items-center justify-center bg-gray-50 
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:bg-gray-100"}`}
                onClick={() => {
                    if (!disabled) inputRef.current?.click();
                }}
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

                {preview && !disabled && (
                    <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                clearImage();
                            }}
                            className="text-white bg-red-500 p-1 rounded-md cursor-pointer"
                        >
                            <Trash2 />
                        </button>
                    </div>
                )}

                <input
                    ref={inputRef}
                    id={`file-input-${field.name}`}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleChange}
                    disabled={disabled}
                />
            </div>

            {error && <span className="text-sm text-red-600">{error}</span>}
        </div>
    );
}
