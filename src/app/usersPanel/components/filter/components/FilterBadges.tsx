import { Badge } from "@/components/ui/badge";
import { CalendarDays, SlidersHorizontal } from "lucide-react";
import { useState, type Dispatch, type SetStateAction } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import {
  miladiToShamsi,
  shamsiToMiladi,
} from "@/components/form/DateConverter";
import { useNavigate, useSearch } from "@tanstack/react-router";
import type { filterdata } from "../types/types";
import FilterModal from "./FilterModal";

export interface filterProps {
  setFilter: Dispatch<SetStateAction<filterdata | undefined>>;
  filter: filterdata | undefined;
}

const FilterBadges = () => {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const search = useSearch({ from: "/search" }); // مسیر route خود را وارد کنید

  const handleDateChange = (dates: DateObject[]) => {
  if (dates && dates.length === 2) {
    const startMiladi = shamsiToMiladi(dates[0].format("YYYY-MM-DD"));
    const endMiladi = shamsiToMiladi(dates[1].format("YYYY-MM-DD"));

    navigate({
      to: "/search",
      search: (prev) => ({
        type__id: [],
        feature__id: [],
        ...prev,
        open_start__gte: startMiladi,
        open_end__lte: endMiladi,
      }),
    });
  } 
};


  const dateValue =
    search?.open_start__gte && search?.open_end__lte
      ? [
          miladiToShamsi(search.open_start__gte),
          miladiToShamsi(search.open_end__lte),
        ]
      : [];

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <Badge
          className="mr-10 h-8 px-3 cursor-pointer"
          onClick={() => setOpenModal(true)}
        >
          <SlidersHorizontal /> فیلتر ها
        </Badge>

        <DatePicker
          value={dateValue}
          onChange={handleDateChange}
          range
          calendar={persian}
          locale={persian_fa}
          calendarPosition="bottom-right"
          inputClass={`rounded-md border p-2 h-9 `}
          render={(_, openCalender) => (
            <Badge
              className="h-8 px-3 cursor-pointer"
              onClick={() => openCalender()}
            >
              <CalendarDays /> انتخاب رنج تاریخ
            </Badge>
          )}
        />
      </div>

      <FilterModal
        open={openModal}
        onOpenChange={() => setOpenModal(false)}
        title="فیلتر ها"
      />
    </div>
  );
};

export default FilterBadges;
