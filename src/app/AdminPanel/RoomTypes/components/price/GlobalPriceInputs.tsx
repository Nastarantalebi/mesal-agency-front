// components/GlobalPriceInputs.tsx
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
  normalPrice: string;
  peakPrice: string;
  onNormalPriceChange: (value: string) => void;
  onPeakPriceChange: (value: string) => void;
  onApplyAll: () => void;
  onApplyFridays: () => void;
}

const GlobalPriceInputs = ({
  normalPrice,
  peakPrice,
  onNormalPriceChange,
  onPeakPriceChange,
  onApplyAll,
  onApplyFridays,
}: Props) => {
  return (
    <div>
      <div className="flex gap-4">
        <div className="flex flex-col gap-1">
          <Label>قیمت نرمال (تومان)</Label>
          <Input
            type="number"
            value={normalPrice}
            onChange={(e) => onNormalPriceChange(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label>قیمت پیک (تومان)</Label>
          <Input
            type="number"
            value={peakPrice}
            onChange={(e) => onPeakPriceChange(e.target.value)}
          />
        </div>
      </div>
      <div className="flex mt-5 mb-10">
        <Badge
          variant="outline"
          className="rounded-full border-accent bg-accent/20 cursor-pointer"
          onClick={onApplyAll}
        >
          اعمال روی همه روز ها
        </Badge>
        <Badge
          variant="outline"
          className="rounded-full border-red-500 bg-red-500/20 mr-3 cursor-pointer"
          onClick={onApplyFridays}
        >
          اعمال روی جمعه ها
        </Badge>
      </div>
    </div>
  );
};


export default GlobalPriceInputs;
