import { Calendar, DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import usePostData from "@/services/usePostData";
import type { TCreatePeakDate, TResponsePeakDate } from "../types";
import { peakDate_key, peakDate_url } from "@/data/querykeys";
import { toast } from "sonner";
import { useState } from "react";
import useDeleteData from "@/services/useDeleteData";

function PeakDate() {
  const [selectedDates, setSelectedDates] = useState<TResponsePeakDate[]>([]);

  const submitDate = usePostData<TCreatePeakDate, TResponsePeakDate>({
    key: [peakDate_key],
    url: peakDate_url,
  });

  const dateDelete = useDeleteData<TResponsePeakDate>({
    key: [peakDate_key],
    url: peakDate_url,
  });

  const handleChange = (dates: DateObject | DateObject[]) => {
    const dateArray = Array.isArray(dates) ? dates : [dates];

    // Find the newly added date
    const newDate = dateArray.find(
      (date) =>
        !selectedDates.some(
          (d) => d.date.format("YYYY-MM-DD") === date.format("YYYY-MM-DD"),
        ),
    );

    // Find removed date
    const removedDate = selectedDates.find(
      (d) =>
        !dateArray.some(
          (date) => date.format("YYYY-MM-DD") === d.date.format("YYYY-MM-DD"),
        ),
    );

    if (newDate) {
      // User selected a new date - POST to backend
      const gregorianDate = newDate.toDate();
      const formattedDate = gregorianDate.toISOString().split("T")[0];

      submitDate.mutateAsync(
        { date: formattedDate },
        {
          onSuccess: (response) => {
            toast.success("تاریخ با موفقیت ثبت شد");
            setSelectedDates([
              ...selectedDates,
              { date: newDate, id: response.id },
            ]);
          },
          onError: () => {
            toast.error("خطا در ثبت تاریخ");
          },
        },
      );
    } else if (removedDate) {

      dateDelete.mutateAsync(
        { id: removedDate.id },
        {
          onSuccess: () => {
            toast.success("تاریخ با موفقیت حذف شد");
            setSelectedDates(
              selectedDates.filter((d) => d.id !== removedDate.id)
            );
          },
          onError: () => {
            toast.error("خطا در حذف تاریخ");
          },
        },
      );
    }
  };

  return (
    <Calendar
      multiple
      value={selectedDates.map((d) => d.date)}
      onChange={handleChange}
      // plugins={[<DatePanel position="right" />]}
      calendar={persian}
      locale={persian_fa}
    />
  );
}

export default PeakDate;