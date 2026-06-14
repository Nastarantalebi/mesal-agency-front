import MonthRangeCalendar from "@/components/form/MonthRangeCalendar";

import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import type { DateObject } from "react-multi-date-picker";
import PriceInputs from "./PriceInputs";
import { Button } from "@/components/ui/button";
import useMonthStores from "./monthStore";
import { useWatch, type UseFormReturn } from "react-hook-form";
import type { TCRoomTypePrices } from "../../types";
import { shamsiToMiladi } from "@/components/form/DateConverter";

interface Props {
  form: UseFormReturn<TCRoomTypePrices, any, TCRoomTypePrices>;
}

const GlobalPriceInputRange = ({ form }: Props) => {
  const [rangeValues, setRangeValues] = useState<DateObject[]>([]);
  const selectedMonth = useMonthStores((s) => s.selectedMonth);
  const [rangeStartDate, setRangeStartDate] = useState<string>("");
  const [rangeEndDate, setRangeEndDate] = useState<string>("");
  const [rangeNormalPrice, setRangeNormalPrice] = useState<number>(0);
  const [rangePeakPrice, setRangePeakPrice] = useState<number>(0);
  const prices = useWatch({ control: form.control, name: "prices" });

  const handleApplyRange = (type: "child" | "adult") => {
    const updated = prices.map((price) => {
      const miladi = shamsiToMiladi(price.date);
      const isInclude =
        miladi >= shamsiToMiladi(rangeStartDate) &&
        miladi <= shamsiToMiladi(rangeEndDate);
      return {
        ...price,
        normal_price:
          isInclude && type === "adult" ? String(rangeNormalPrice) : price.normal_price,
        peak_price:
          isInclude && type === "adult" ? String(rangePeakPrice) : price.peak_price,
        normal_child_price:
          isInclude && type === "child"
            ? String(rangeNormalPrice)
            : price.normal_child_price,
        peak_child_price:
          isInclude && type === "child"
            ? String(rangePeakPrice)
            : price.peak_child_price,
      };
    });

    form.reset({ prices: updated });
  };

  const handleRangeChange = (values: DateObject[]) => {
    setRangeValues(values);
    if (values[0]) setRangeStartDate(values[0].format("YYYY/MM/DD"));
    if (values[1]) setRangeEndDate(values[1].format("YYYY/MM/DD"));
  };

  useEffect(() => {
    setRangeValues([]);
    setRangeStartDate("");
    setRangeEndDate("");
  }, [selectedMonth]);

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
            normalPrice={rangeNormalPrice}
            peakPrice={rangePeakPrice}
            onNormalPriceChange={setRangeNormalPrice}
            onPeakPriceChange={setRangePeakPrice}
          />
          <div className="flex flex-row gap-2">
            <Button
              className="bg-accent text-black cursor-pointer"
              onClick={() => handleApplyRange("adult")}
              type="button"
            >
              اعمال قیمت روی بزرگسال
            </Button>
            <Button
              className="bg-accent text-black cursor-pointer"
              onClick={() => handleApplyRange("child")}
              type="button"
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
