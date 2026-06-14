import FormInput from "@/_components/Form/FormInput";
import { Label } from "@/components/ui/label";
import { Equal, Plus } from "lucide-react";
import { useState } from "react";

interface Props {
  normalPrice: number;
  peakPrice: number;
  onNormalPriceChange: (value: number) => void;
  onPeakPriceChange: (value: number) => void;
}

const PriceInputs = ({
  normalPrice,
  peakPrice,
  onNormalPriceChange,
  onPeakPriceChange,
}: Props) => {

  const [pricePlus, setPricePlus] = useState<number>(0);
  const [pricePercentage, setPricePercentage] = useState<number>(0);

  const calculateByPlus = (normal: number, plus: number) => {
    const result = normal + plus;
    onPeakPriceChange(result);
  };

  const calculateByPercentage = (normal: number, percent: number) => {
    const result = (normal * percent) / 100;
    onPeakPriceChange(normal + result);
  };

  const handlePricePlusChange = (value: number) => {
    setPricePlus(value);
    setPricePercentage(0);
    calculateByPlus(normalPrice, value);
  };

  const handlePricePercentageChange = (value: number) => {
    setPricePercentage(value);
    setPricePlus(0);
    calculateByPercentage(normalPrice, value);
  };

  const handleNormalPriceChange = (value: number) => {

    onNormalPriceChange(value);
    if (pricePlus) calculateByPlus(value, pricePlus);
    else if (pricePercentage) calculateByPercentage(value, pricePercentage);
  };

  const handlePeakPriceChange = (value: number) => {
    onPeakPriceChange(value);
  };

  return (
    <div className="flex gap-4 flex-wrap items-center">
      <div className="flex flex-col gap-1">
        <Label>قیمت نرمال (تومان)</Label>
        <FormInput
          type="number"
          className="w-30"
          value={normalPrice}
          money={true}
          onChange={(e) => handleNormalPriceChange(+e.target.value)}
        />
      </div>
      <Plus />
      <div className="flex flex-col gap-1">
        <Label>تومان</Label>
        <FormInput
          className="w-24!"
          type="number"
          value={pricePlus}
          money={true}
          onChange={(e) => handlePricePlusChange(+e.target.value)}
        />
        <Label>درصد</Label>
        <FormInput
          className="w-24!"
          type="number"
          value={pricePercentage}
          onChange={(e) => handlePricePercentageChange(+e.target.value)}
        />
      </div>
      <Equal />
      <div className="flex flex-col gap-1">
        <Label>قیمت پیک (تومان)</Label>
        <FormInput
          type="number"
          className="w-30"
          value={peakPrice}
          money={true}

          onChange={(e) => handlePeakPriceChange(+e.target.value)}
        />
      </div>
    </div>
  );
};

export default PriceInputs;
