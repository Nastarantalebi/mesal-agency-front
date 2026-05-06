import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { Controller, type FieldValues } from "react-hook-form";
import type { Props } from "./PropsType";

// interface Props {
//   buttonName?: string;
//   count: number;
//   onAdd: () => void;
//   onRemove: () => void;
//   control: C
// }

const AddRemoveButtonTemplate = <T extends FieldValues>({
  name,
  label,
  control,
}: Props<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="flex-row inline-flex items-center gap-5 m-1 px-4 py-3 rounded-lg border bg-muted/30 hover:bg-muted/50 transition-colors">
          <div className="flex items-center ">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => field.onChange(field.value - 1)}
              disabled={field.value === 0}
              className="h-7 w-7 rounded-full  bg-red-300 hover:bg-red-400"
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-6 text-center text-sm font-semibold tabular-nums">
              {field.value}
            </span>
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => field.onChange(field.value + 1)}
              className="h-7 w-7 rounded-full bg-green-300 hover:bg-green-400"
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          <div className="border-l h-8" />
          <span className="text-sm font-medium text-foreground">
            {label}
          </span>
        </div>
      )}
    />
  );
};

export default AddRemoveButtonTemplate;
