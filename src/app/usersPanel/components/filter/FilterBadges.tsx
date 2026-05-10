import { Badge } from "@/components/ui/badge";
import { CalendarDays, SlidersHorizontal } from "lucide-react";
import { useState, type Dispatch, type SetStateAction } from "react";
import FilterModal from "./FilterModal";
import type { filterdata } from "./types/types";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import {
  miladiToShamsi,
  shamsiToMiladi,
} from "@/components/form/DateConverter";

export interface filterProps {
  setFilter: Dispatch<SetStateAction<filterdata | undefined>>;
  filter: filterdata | undefined;
}

const FilterBadges = ({ setFilter, filter }: filterProps) => {
  const [openModal, setOpenModal] = useState(false);

  const handleDateChange = (dates: DateObject | DateObject[]) => {

    const datesArray = Array.isArray(dates) ? dates : dates ? [dates] : [];

    if (datesArray.length === 2) {
      setFilter((prev) => ({
        ...prev,
        type__id: prev?.type__id ?? [],
        feature__id: prev?.feature__id ?? [],
        open_start__gte:
          shamsiToMiladi(datesArray[0]?.format("YYYY-MM-DD")) || null,
        open_end__lte:
          shamsiToMiladi(datesArray[1]?.format("YYYY-MM-DD")) || null,
      }));
    } else if (datesArray.length === 0) {
      setFilter((prev) => ({
        ...prev,
        type__id: prev?.type__id ?? [],
        feature__id: prev?.feature__id ?? [],
        open_start__gte: null,
        open_end__lte: null,
      }));
    }

    console.log(filter)
  };

  const dateValue =
    filter?.open_start__gte && filter?.open_end__lte
      ? [
          miladiToShamsi(filter.open_start__gte),
          miladiToShamsi(filter.open_end__lte),
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

      {openModal && (
        <FilterModal
          open={openModal}
          onOpenChange={() => setOpenModal(false)}
          title="فیلتر ها"
          setFilter={setFilter}
        />
      )}
    </div>
  );
};

export default FilterBadges;
