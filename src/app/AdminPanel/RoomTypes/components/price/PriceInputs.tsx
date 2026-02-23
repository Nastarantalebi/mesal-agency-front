import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Equal, Plus } from "lucide-react";
import { useState } from "react";

interface Props {
  normalPrice: string;
  peakPrice: string;
  onNormalPriceChange: (value: string) => void;
  onPeakPriceChange: (value: string) => void;
}

const PriceInputs = ({
  normalPrice,
  peakPrice,
  onNormalPriceChange,
  onPeakPriceChange,
}: Props) => {
    const [pricePlus, setPricePlus] = useState<string>("");
  return (
    <div className="flex gap-4 flex-wrap items-center mt-3 mb-5">
      <div className="flex flex-col gap-1">
        <Label>قیمت نرمال (تومان)</Label>
        <Input
          type="number"
          className="w-30"
          value={normalPrice}
          onChange={(e) => onNormalPriceChange(e.target.value)}
        />
      </div>
      <Plus />
      <div className="flex flex-col gap-1">
        <Input className="w-15" value={pricePlus} placeholder="تومان" />
        {/* <Input className="w-15" placeholder="درصد" /> */}
      </div>
      <Equal/>
      <div className="flex flex-col gap-1">
        <Label>قیمت پیک (تومان)</Label>
        <Input
          type="number"
          className="w-30"
          value={peakPrice}
          onChange={(e) => onPeakPriceChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default PriceInputs;
