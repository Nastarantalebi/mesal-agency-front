// components/GlobalPriceInputs.tsx
import { Badge } from "@/components/ui/badge";
import PriceInputs from "./PriceInputs";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { whatDay } from "@/lib/getDaysInMonth";
import { useWatch, type UseFormReturn } from "react-hook-form";
import type { TCRoomTypePrices } from "../../types";

interface Props {
  form: UseFormReturn<TCRoomTypePrices, any, TCRoomTypePrices>;
}

const GlobalPriceInputs = ({ form }: Props) => {
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [globalNormalPrice, setGlobalNormalPrice] = useState<number>(0);
  const [globalPeakPrice, setGlobalPeakPrice] = useState<number>(0);

  const toggleDaySelection = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day)
        ? prev.filter((selectedDay) => selectedDay !== day)
        : [...prev, day],
    );
  };
  const daysOfWeek = [
    { name: "شنبه", value: "saturday" },
    { name: "یکشنبه", value: "sunday" },
    { name: "دوشنبه", value: "monday" },
    { name: "سه‌شنبه", value: "tuesday" },
    { name: "چهارشنبه", value: "wednesday" },
    { name: "پنجشنبه", value: "thursday" },
    { name: "جمعه", value: "friday" },
  ];

  const prices = useWatch({ control: form.control, name: "prices" });

  const onApplySelectedDays = (
    selectedDays: string[],
    type: "child" | "adult",
  ) => {
    const updated = prices.map((price) => {
      const dayName = whatDay(price.date);
      const isInclude = selectedDays.includes(dayName);
      return {
        ...price,
        normal_price:
          isInclude && type === "adult"
            ? +globalNormalPrice
            : price.normal_price,
        peak_price:
          isInclude && type === "adult" ? +globalPeakPrice : price.peak_price,
        normal_child_price:
          isInclude && type === "child"
            ? +globalNormalPrice
            : price.normal_child_price,
        peak_child_price:
          isInclude && type === "child"
            ? +globalPeakPrice
            : price.peak_child_price,
      };
    });

    form.reset({ prices: updated });
  };

  return (
    <div className="flex items-center justify-center flex-col">
      <div className="flex gap-4">
        <PriceInputs
          normalPrice={globalNormalPrice}
          peakPrice={globalPeakPrice}
          onNormalPriceChange={setGlobalNormalPrice}
          onPeakPriceChange={setGlobalPeakPrice}
        />
      </div>
      <div className="flex mt-5 mb-10 gap-2 flex-wrap">
        {/* Dynamic Badges for each day */}
        {daysOfWeek.map((day) => (
          <Badge
            key={day.value}
            variant={selectedDays.includes(day.value) ? "primary" : "outline"} // Change style when selected
            className={`rounded-full cursor-pointer px-3 py-1 text-sm ${
              selectedDays.includes(day.value)
                ? "bg-primary/50 text-secondary"
                : "border-primary"
            }`}
            onClick={() => toggleDaySelection(day.value)} // Toggle selection when clicked
          >
            {day.name}
          </Badge>
        ))}
      </div>
      <div className="flex flex-row gap-2">
        <Button
          type="button"
          className="bg-accent text-black cursor-pointer"
          onClick={() => {
            onApplySelectedDays(selectedDays, "adult");
            setSelectedDays([]);
          }}
        >
          اعمال قیمت روی بزرگسال
        </Button>
        <Button
          type="button"
          className="bg-accent text-black cursor-pointer"
          onClick={() => {
            onApplySelectedDays(selectedDays, "child");
            setSelectedDays([]);
          }}
        >
          اعمال قیمت روی کودک
        </Button>
      </div>
    </div>
  );
};

export default GlobalPriceInputs;
