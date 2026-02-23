import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Equal, Plus } from "lucide-react";
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
  const [pricePercentage, setPricePercentage] = useState<string>("");

  const deletePercentageCharacter = (value: string) => {
    return value.replace(/[^0-9]/g, "");
  };

  const calculateByPlus = (normal: string, plus: string) => {
    onPeakPriceChange(String(Number(normal) + Number(plus)));
  };

  const calculateByPercentage = (normal: string, percent: string) => {
    const result = (Number(normal) * Number(percent)) / 100;
    onPeakPriceChange(String(Number(normal) + result));
  };

  const handlePricePlusChange = (value: string) => {
    const newValue = deletePercentageCharacter(value);
    setPricePlus(newValue);
    setPricePercentage("");
    calculateByPlus(normalPrice, newValue);
  };

  const handlePricePercentageChange = (value: string) => {
    const newValue = deletePercentageCharacter(value);
    setPricePercentage(newValue);
    setPricePlus("");
    calculateByPercentage(normalPrice, newValue);
  };

  const handleNormalPriceChange = (value: string) => {
    onNormalPriceChange(value);
    if (pricePlus) calculateByPlus(value, pricePlus);
    else if (pricePercentage) calculateByPercentage(value, pricePercentage);
  };

  return (
    <div className="flex gap-4 flex-wrap items-center mt-3 mb-5">
      <div className="flex flex-col gap-1">
        <Label>قیمت نرمال (تومان)</Label>
        <Input
          type="number"
          className="w-30"
          value={normalPrice}
          onChange={(e) => handleNormalPriceChange(e.target.value)}
        />
      </div>
      <Plus />
      <div className="flex flex-col gap-1">
        <Input
          className="w-15"
          value={pricePlus}
          placeholder="تومان"
          onChange={(e) => handlePricePlusChange(e.target.value)}
        />
        <Input
          className="w-15"
          value={pricePercentage}
          placeholder="درصد"
          onChange={(e) => handlePricePercentageChange(e.target.value)}
        />
      </div>
      <Equal />
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
