import { shamsiToMiladi } from "@/components/form/DateConverter";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { Calendar, DateObject } from "react-multi-date-picker";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  AccommodationId: string;
  RoomId: string | null;
}

const RoomTypePriceForm = ({
  open,
  onOpenChange,
  title,
  AccommodationId,
  RoomId,
}: Props) => {
  const [selectedMonth, setSelectedMonth] = useState<DateObject | null>(null);

  const getDaysInMonth = () => {
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <Calendar
          value={selectedMonth}
          onChange={setSelectedMonth}
          onlyMonthPicker
          calendar={persian}
          locale={persian_fa}
        />

        {selectedMonth && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>روز</TableHead>
                <TableHead>تاریخ</TableHead>
                <TableHead>قیمت</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {getDaysInMonth().map((item) => (
                <TableRow key={item.day}>
                  <TableCell>{item.day}</TableCell>
                  <TableCell>{item.shamsi}</TableCell>
                  <TableCell>
                    <Input type="number" placeholder="0" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default RoomTypePriceForm;