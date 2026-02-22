import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { Calendar, DateObject } from "react-multi-date-picker";

interface Props {
  selectedMonth: DateObject | null; // from your month picker
  values: DateObject[];
  onChange: (values: DateObject[]) => void;
}

const MonthRangeCalendar = ({ selectedMonth, values, onChange }: Props) => {
  if (!selectedMonth) return null;

  const year = selectedMonth.year;
  const month = selectedMonth.month.number;
  const daysInMonth = month <= 6 ? 31 : month <= 11 ? 30 : 29;

  const minDate = new DateObject({ calendar: persian, year, month, day: 1 });
  const maxDate = new DateObject({
    calendar: persian,
    year,
    month,
    day: daysInMonth,
  });

  return (
    <Calendar
      key={`${year}-${month}`}
      value={values}
      onChange={onChange}
      range
      rangeHover
      calendar={persian}
      locale={persian_fa}
      minDate={minDate}
      maxDate={maxDate}
      currentDate={minDate} // open on the selected month
    />
  );
};

export default MonthRangeCalendar;
