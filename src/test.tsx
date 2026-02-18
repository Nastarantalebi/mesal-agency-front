import { Calendar, DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import usePostData from "@/services/usePostData";

import { peakDate_key, peakDate_url } from "@/data/querykeys";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import useDeleteData from "@/services/useDeleteData";
import useGetData from "@/services/useGetData";
import type { TCreatePeakDate, TPeakDateState, TResponsePeakDate } from "./app/AdminPanel/peakDate/types";

function PeakDate() {
  const [selectedDates, setSelectedDates] = useState<TPeakDateState[]>([]);
  const [currentDate, setCurrentDate] = useState<DateObject>(
    new DateObject({ calendar: persian, locale: persian_fa }),
  );

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

  const submitDate = usePostData<TCreatePeakDate, TResponsePeakDate>({
    key: [peakDate_key],
    url: peakDate_url,
  });

  const dateDelete = useDeleteData<TResponsePeakDate>({
    key: [peakDate_key],
    url: peakDate_url,
  });

  const { data: peakDates, refetch } = useGetData<TResponsePeakDate[]>({
    key: [peakDate_key, startDate, endDate],
    url: `${peakDate_url}?start_date=${startDate}&end_date=${endDate}`,
  });

  useEffect(() => {
    if (peakDates) {
      const mapped: TPeakDateState[] = peakDates.map((item) => ({
        id: item.id,
        date: new DateObject({
          date: new Date(item.date),
          calendar: persian,
          locale: persian_fa,
        }),
      }));
      setSelectedDates(mapped);
    }
  }, [peakDates]);

  const handleChange = (dates: DateObject | DateObject[]) => {
    const dateArray = Array.isArray(dates) ? dates : [dates];

    const newDate = dateArray.find(
      (date) =>
        !selectedDates.some(
          (d) => d.date.format("YYYY-MM-DD") === date.format("YYYY-MM-DD"),
        ),
    );

    const removedDate = selectedDates.find(
      (d) =>
        !dateArray.some(
          (date) => date.format("YYYY-MM-DD") === d.date.format("YYYY-MM-DD"),
        ),
    );

    if (newDate) {
      const formattedDate = newDate.toDate().toISOString().split("T")[0];

      // Optimistic add with temp id
      const tempId = `temp-${Date.now()}`;
      setSelectedDates((prev) => [...prev, { date: newDate, id: tempId }]);

      submitDate.mutateAsync(
        { date: formattedDate },
        {
          onSuccess: () => {
            toast.success("تاریخ با موفقیت ثبت شد");
            refetch();
          },
          onError: () => {
            toast.error("خطا در ثبت تاریخ");
            // Rollback optimistic update
            setSelectedDates((prev) => prev.filter((d) => d.id !== tempId));
          },
        },
      );
    } else if (removedDate) {
      // Optimistic remove
      setSelectedDates((prev) => prev.filter((d) => d.id !== removedDate.id));

      dateDelete.mutateAsync(
        { id: removedDate.id },
        {
          onSuccess: () => {
            toast.success("تاریخ با موفقیت حذف شد");
            refetch();
          },
          onError: () => {
            toast.error("خطا در حذف تاریخ");
            // Rollback: restore removed date
            setSelectedDates((prev) => [...prev, removedDate]);
          },
        },
      );
    }
  };

  const handleMonthChange = (date: DateObject) => {
    setCurrentDate(date);
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