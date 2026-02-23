// components/GlobalPriceInputRange.tsx
import MonthRangeCalendar from "@/components/form/MonthRangeCalendar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import type { DateObject } from "react-multi-date-picker";
import PriceInputs from "./PriceInputs";

interface Props {
  normalPrice: string;
  peakPrice: string;
  onStartDateChange: (value: string) => void;
  onEndDateChange: (value: string) => void;
  onNormalPriceChange: (value: string) => void;
  onPeakPriceChange: (value: string) => void;
  onApplyRange: () => void;
  selectedMonth: DateObject | null;
}

const GlobalPriceInputRange = ({
  normalPrice,
  peakPrice,
  onStartDateChange,
  onEndDateChange,
  onNormalPriceChange,
  onPeakPriceChange,
  onApplyRange,
  selectedMonth,
}: Props) => {
  const [rangeValues, setRangeValues] = useState<DateObject[]>([]);

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

  return (
    <div>
      <div className="flex flex-row gap-10 items-center justify-center ">
        <div className="flex flex-col gap-1">
          <Label className="mb-3">انتخاب بازه زمانی:</Label>
          <MonthRangeCalendar
            selectedMonth={selectedMonth}
            values={rangeValues}
            onChange={handleRangeChange}
          />
        </div>
        <div className="flex flex-col items-center justify-center gap-5">
          <PriceInputs
            normalPrice={normalPrice}
            peakPrice={peakPrice}
            onNormalPriceChange={onNormalPriceChange}
            onPeakPriceChange={onPeakPriceChange}
          />
          <Badge
            variant="outline"
            className="rounded-full border-accent bg-accent/20 cursor-pointer"
            onClick={onApplyRange}
          >
            اعمال روی بازه
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default GlobalPriceInputRange;
