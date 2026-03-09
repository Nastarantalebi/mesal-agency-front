// components/GlobalPriceInputRange.tsx
import MonthRangeCalendar from "@/components/form/MonthRangeCalendar";

import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import type { DateObject } from "react-multi-date-picker";
import PriceInputs from "./PriceInputs";
import { Button } from "@/components/ui/button";
import useMonthStores from "./monthStore";

interface Props {
  normalPrice: string;
  peakPrice: string;
  onStartDateChange: (value: string) => void;
  onEndDateChange: (value: string) => void;
  onAdultNormalPriceChange: (value: string) => void;
  onAdultPeakPriceChange: (value: string) => void;
  onChildNormalPriceChange: (value: string) => void;
  onChildPeakPriceChange: (value: string) => void;
  onAdultPriceApply: () => void;
  onChildPriceApply: () => void;
}

const GlobalPriceInputRange = ({
  normalPrice,
  peakPrice,
  onStartDateChange,
  onEndDateChange,
  onAdultNormalPriceChange,
  onAdultPeakPriceChange,
  onChildNormalPriceChange,
  onChildPeakPriceChange,
  onAdultPriceApply,
  onChildPriceApply,
}: Props) => {
  const [rangeValues, setRangeValues] = useState<DateObject[]>([]);
  const selectedMonth = useMonthStores((s) => s.selectedMonth);

  const handleRangeChange = (values: DateObject[]) => {
    setRangeValues(values);
    if (values[0]) onStartDateChange(values[0].format("YYYY/MM/DD"));
    if (values[1]) onEndDateChange(values[1].format("YYYY/MM/DD"));
  };

  useEffect(() => {
    setRangeValues([]);
    onStartDateChange("");
    onEndDateChange("");
  }, [selectedMonth]);

  
  // console.log("onAdultPriceApply:", onAdultPriceApply); // Inspect in console
  // console.log("onChildPriceApply:", onChildPriceApply); // Inspect in console

  return (
    <div>
      <div className="flex flex-row gap-10 items-center justify-center ">
        <div className="flex flex-col gap-1">
          <Label className="mb-3">انتخاب بازه زمانی:</Label>
          <MonthRangeCalendar
            values={rangeValues}
            onChange={handleRangeChange}
          />
        </div>
        <div className="flex flex-col items-center justify-center gap-5">
          <PriceInputs
            normalPrice={normalPrice}
            peakPrice={peakPrice}
            onAdultNormalPriceChange={onAdultNormalPriceChange}
            onAdultPeakPriceChange={onAdultPeakPriceChange}
            onChildNormalPriceChange={onChildNormalPriceChange}
            onChildPeakPriceChange={onChildPeakPriceChange}
          />
          <div className="flex flex-row gap-2">
            <Button
              className="bg-accent text-black cursor-pointer"
              onClick={onAdultPriceApply}
            >
              اعمال قیمت روی بزرگسال
            </Button>
            <Button
              className="bg-accent text-black cursor-pointer"
              onClick={onChildPriceApply}
            >
              اعمال قیمت روی کودک
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalPriceInputRange;
