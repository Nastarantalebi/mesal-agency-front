import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import GlobalPriceInputs from "./GlobalPriceInputs";
import type { DateObject } from "react-multi-date-picker";
import GlobalPriceInputRange from "./GlobalPriceInputRange";

interface Props {
  globalNormalPrice: string;
  globalPeakPrice: string;
  setGlobalNormalPrice: (value: string) => void;
  setGlobalPeakPrice: (value: string) => void;
  onApplyAll: () => void;
  onApplyFridays: () => void;
  selectedMonth: DateObject | null;
  onApplyRange: (
    start: string,
    end: string,
    normalPrice: string,
    peakPrice: string,
  ) => void;
}

const PriceTabs = ({
  globalNormalPrice,
  globalPeakPrice,
  setGlobalNormalPrice,
  setGlobalPeakPrice,
  onApplyAll,
  onApplyFridays,
  selectedMonth,
  onApplyRange,
}: Props) => {
  const [rangeStartDate, setRangeStartDate] = useState<string>("");
  const [rangeEndDate, setRangeEndDate] = useState<string>("");
  const [rangeNormalPrice, setRangeNormalPrice] = useState<string>("");
  const [rangePeakPrice, setRangePeakPrice] = useState<string>("");

  const handleApplyRange = () => {
    onApplyRange(
      rangeStartDate,
      rangeEndDate,
      rangeNormalPrice,
      rangePeakPrice,
    );
  };

  const items = [
    {
      title: "انتخاب روز",
      component: (
        <GlobalPriceInputs
          normalPrice={globalNormalPrice}
          peakPrice={globalPeakPrice}
          onNormalPriceChange={setGlobalNormalPrice}
          onPeakPriceChange={setGlobalPeakPrice}
          onApplyAll={onApplyAll}
          onApplyFridays={onApplyFridays}
        />
      ),
    },
    {
      title: "انتخاب رنج تاریخ",
      component: (
        <GlobalPriceInputRange
          selectedMonth={selectedMonth}
          normalPrice={rangeNormalPrice}
          peakPrice={rangePeakPrice}
          onStartDateChange={setRangeStartDate}
          onEndDateChange={setRangeEndDate}
          onNormalPriceChange={setRangeNormalPrice}
          onPeakPriceChange={setRangePeakPrice}
          onApplyRange={handleApplyRange}
        />
      ),
    },
  ];

  return (
    <Tabs defaultValue={items[0].title} className="w-full">
      <TabsList className="w-full">
        {items.map((item) => (
          <TabsTrigger
            key={item.title}
            value={item.title}
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-6 py-3 text-base"
          >
            {item.title}
          </TabsTrigger>
        ))}
      </TabsList>
      <div className="py-10">
        {items.map((item) => (
          <TabsContent key={item.title} value={item.title}>
            {item.component}
          </TabsContent>
        ))}
      </div>
    </Tabs>
  );
};

export default PriceTabs;
