import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

interface Props {
  buttonName: string;
  count: number;
  onAdd: () => void;
  onRemove: () => void;
}

const BedButtonTemplate = ({ buttonName, count, onAdd, onRemove }: Props) => {

  return (
    <div className="flex flex-row inline-flex items-center gap-5 px-4 py-3 rounded-lg border bg-muted/30 hover:bg-muted/50 transition-colors">
      <div className="flex items-center ">
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={onRemove}
          disabled={count === 0}
          className="h-7 w-7 rounded-full  bg-red-300 hover:bg-red-400"
        >
          <Minus className="h-3 w-3" />
        </Button>
        <span className="w-6 text-center text-sm font-semibold tabular-nums">
          {count}
        </span>
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={onAdd}
          className="h-7 w-7 rounded-full bg-green-300 hover:bg-green-400"
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>
      <div className="border-l h-8" />
      <span className="text-sm font-medium text-foreground">{buttonName}</span>
    </div>
  );
};

export default BedButtonTemplate;