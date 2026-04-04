import { Calendar, DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { useEffect, useRef, useState } from "react";
import type { TPeakDateState, TResponsePeakDate } from "../types";
import usePeakDate from "../services/usePeakDate";

interface Props {
  accommodationId: number;
}

function PeakDate({ accommodationId }: Props) {
  const [currentDate, setCurrentDate] = useState<DateObject>(
    new DateObject({ calendar: persian, locale: persian_fa }),
  );
  const [selectedDates, setSelectedDates] = useState<TPeakDateState[]>([]);

  // Use ref to avoid stale closure in mutateAsync callbacks
  const selectedDatesRef = useRef<TPeakDateState[]>(selectedDates);
  
  useEffect(() => {
    selectedDatesRef.current = selectedDates;
  }, [selectedDates]);

  const startDate = new DateObject({
    year: currentDate.year,
    month: currentDate.month.number,
    day: 1,
    calendar: persian,
  })
    .toDate()
    .toISOString()
    .split("T")[0];

  const endDate = new DateObject({
    year: currentDate.year,
    month: currentDate.month.number,
    day: currentDate.month.length,
    calendar: persian,
  })
    .toDate()
    .toISOString()
    .split("T")[0];

  const { getPeakDates, postPeakDate, deletePeakDate } = usePeakDate(accommodationId, startDate, endDate);

  // Sync server data → local state on month change (fresh fetch)
  useEffect(() => {
    if (getPeakDates.data) {
      const mapped: TPeakDateState[] = getPeakDates.data.map((item) => ({
        id: item.id,
        date: new DateObject({
          date: new Date(item.date),
          calendar: persian,
          locale: persian_fa,
        }),
      }));
      setSelectedDates(mapped);
    } else {
      // Clear when switching to a month with no data yet
      setSelectedDates([]);
    }
  }, [getPeakDates.data]);

  const handleChange = (dates: DateObject | DateObject[]) => {
    const dateArray = Array.isArray(dates) ? dates : [dates];
    const current = selectedDatesRef.current;

    const newDate = dateArray.find(
      (date) =>
        !current.some(
          (d) => d.date.format("YYYY-MM-DD") === date.format("YYYY-MM-DD"),
        ),
    );

    const removedDate = current.find(
      (d) =>
        !dateArray.some(
          (date) => date.format("YYYY-MM-DD") === d.date.format("YYYY-MM-DD"),
        ),
    );

    if (newDate) {
      const formattedDate = newDate.toDate().toISOString().split("T")[0];

      // Optimistic update
      const optimistic: TPeakDateState = { date: newDate, id: "" };
      setSelectedDates((prev) => [...prev, optimistic]);

      postPeakDate.mutateAsync(
        { date: formattedDate },
        {
          onSuccess: (response: TResponsePeakDate) => {
            setSelectedDates((prev) =>
              prev.map((d) =>
                d.id === "" &&
                d.date.format("YYYY-MM-DD") === newDate.format("YYYY-MM-DD")
                  ? { ...d, id: response.id }
                  : d,
              ),
            );
          },
          onError: () => {
            setSelectedDates((prev) => prev.filter((d) => d.id !== ""));
          },
        },
      );
    } else if (removedDate) {
      // Optimistic removal
      setSelectedDates((prev) => prev.filter((d) => d.id !== removedDate.id));

      deletePeakDate.mutateAsync(
        { id: removedDate.id },
        {
          onError: () => {
            setSelectedDates((prev) => [...prev, removedDate]);
          },
        },
      );
    }
  };

  const handleMonthChange = (date: DateObject) => {
    setCurrentDate(new DateObject(date));
  };

  return (
    <Calendar
      className="big-calendar"
      multiple
      value={selectedDates.map((d) => d.date)}
      onChange={handleChange}
      onMonthChange={handleMonthChange}
      calendar={persian}
      locale={persian_fa}
    />
  );
}

export default PeakDate;
