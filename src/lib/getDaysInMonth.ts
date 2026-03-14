import { shamsiToMiladi } from "@/components/form/DateConverter";
import type { DateObject } from "react-multi-date-picker";

  export const getDaysInMonth = (selectedMonth?: DateObject | null) => {
    if (!selectedMonth) return [];

    const year = selectedMonth.year;
    const month = selectedMonth.month.number;

    // تعداد روزهای هر ماه شمسی
    const daysInMonth = month <= 6 ? 31 : month <= 11 ? 30 : 29;

    const days = [];
    for (let day = 1; day <= daysInMonth; day++) {
      days.push({
        day,
        shamsi: `${year}/${month}/${day}`,
      });
    }
    return days;
  };

  export   const whatDay = (shamsi: string) => {
      const miladi = shamsiToMiladi(shamsi);
      const date = new Date(miladi);
      const getDay = date.getDay();
      switch (getDay) {
        case 0:
          return "saturday";
        case 1:
          return "sunday";
        case 2:
          return "monday";
        case 3:
          return "tuesday";
        case 4:
          return "wednesday";
        case 5:
          return "thursday";
        case 6:
          return "friday";
      }
  
      return "";
    };
