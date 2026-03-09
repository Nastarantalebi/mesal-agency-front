// components/GlobalPriceInputs.tsx
import { Badge } from "@/components/ui/badge";
import PriceInputs from "./PriceInputs";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Props {
  normalPrice: string;
  peakPrice: string;
  onAdultNormalPriceChange: (value: string) => void;
  onAdultPeakPriceChange: (value: string) => void;
  onChildNormalPriceChange: (value: string) => void;
  onChildPeakPriceChange: (value: string) => void;
  onApplyAdultSelectedDays: (selectedDays: string[]) => void;
  onApplyChildSelectedDays: (selectedDays: string[]) => void;
}

const GlobalPriceInputs = ({
  normalPrice,
  peakPrice,
  onAdultNormalPriceChange,
  onAdultPeakPriceChange,
  onChildNormalPriceChange,
  onChildPeakPriceChange,
  onApplyAdultSelectedDays,
  onApplyChildSelectedDays,
}: Props) => {
  
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
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

  return (
    <div className="flex items-center justify-center flex-col">
      <div className="flex gap-4">
        <PriceInputs
          normalPrice={normalPrice}
          peakPrice={peakPrice}
          onAdultNormalPriceChange={onAdultNormalPriceChange}
          onAdultPeakPriceChange={onAdultPeakPriceChange}
          onChildNormalPriceChange={onChildNormalPriceChange}
          onChildPeakPriceChange={onChildPeakPriceChange}
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
          className="bg-accent text-black cursor-pointer"
          onClick={() => {
            onApplyAdultSelectedDays(selectedDays);
            setSelectedDays([]);
          }}
        >
          اعمال قیمت روی بزرگسال
        </Button>
        <Button
          className="bg-accent text-black cursor-pointer"
          onClick={() => {
            onApplyChildSelectedDays(selectedDays);
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
