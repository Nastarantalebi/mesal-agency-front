import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import GlobalPriceInputs from "./GlobalPriceInputs";
import GlobalPriceInputRange from "./GlobalPriceInputRange";

interface Props {
  globalNormalPrice: string;
  globalPeakPrice: string;
  setGlobalNormalPrice: (value: string) => void;
  setGlobalPeakPrice: (value: string) => void;
  onApplyAdultSelectedDay: (selectedDays: string[]) => void;
  onApplyChildSelectedDay: (selectedDays: string[]) => void;
  onApplyAdultRange: (
    start: string,
    end: string,
    adultNormalPrice?: string,
    adultPeakPrice?: string,
  ) => void;
  onApplyChildRange: (
    start: string,
    end: string,
    childNormalPrice?: string,
    childPeakPrice?: string,
  ) => void
}

const PriceTabs = ({
  globalNormalPrice,
  globalPeakPrice,
  setGlobalNormalPrice,
  setGlobalPeakPrice,
  onApplyAdultSelectedDay,
  onApplyChildSelectedDay,
  onApplyAdultRange,
  onApplyChildRange,
}: Props) => {
  const [rangeStartDate, setRangeStartDate] = useState<string>("");
  const [rangeEndDate, setRangeEndDate] = useState<string>("");
  const [rangeAdultNormalPrice, setRangeAdultNormalPrice] =
    useState<string>("");
  const [rangeAdultPeakPrice, setRangeAdultPeakPrice] = useState<string>("");
  const [rangeChildNormalPrice, setRangeChildNormalPrice] =
    useState<string>("");
  const [rangeChildPeakPrice, setRangeChildPeakPrice] = useState<string>("");

  const handleAdultApplyRange = () => {
    onApplyAdultRange(
      rangeStartDate,
      rangeEndDate,
      rangeAdultNormalPrice,
      rangeAdultPeakPrice,
    );
  };

  const handleChildApplyRange = () => {
    onApplyChildRange(
      rangeStartDate,
      rangeEndDate,
      rangeChildNormalPrice,
      rangeChildPeakPrice,
    );
  };

  const items = [
    {
      title: "انتخاب روز",
      component: (
        <GlobalPriceInputs
          normalPrice={globalNormalPrice}
          peakPrice={globalPeakPrice}
          onAdultNormalPriceChange={setGlobalNormalPrice}
          onAdultPeakPriceChange={setGlobalPeakPrice}
          onChildNormalPriceChange={setRangeChildNormalPrice}
          onChildPeakPriceChange={setRangeChildPeakPrice}
          onApplyAdultSelectedDays={onApplyAdultSelectedDay}
          onApplyChildSelectedDays={onApplyChildSelectedDay}
        />
      ),
    },
    {
      title: "انتخاب رنج تاریخ",
      component: (
        <GlobalPriceInputRange
          normalPrice={rangeAdultNormalPrice}
          peakPrice={rangeAdultPeakPrice}
          onStartDateChange={setRangeStartDate}
          onEndDateChange={setRangeEndDate}
          onAdultNormalPriceChange={setRangeAdultNormalPrice}
          onAdultPeakPriceChange={setRangeAdultPeakPrice}
          onChildNormalPriceChange={setRangeChildNormalPrice}
          onChildPeakPriceChange={setRangeChildPeakPrice}
          onAdultPriceApply={handleAdultApplyRange}
          onChildPriceApply={handleChildApplyRange}
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
