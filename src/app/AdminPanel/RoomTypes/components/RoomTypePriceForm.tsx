import CustomInput from "@/components/form/CustomInput";
import { shamsiToMiladi } from "@/components/form/DateConverter";
import { CustomDataTable } from "@/components/list/CustomDataTable";
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
import type { ColumnDef } from "@tanstack/react-table";
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

// type DateType = {
//     day: number;
//     shamsi: string;
// }

// type PriceItem = {
//   id: number;
//   day: number;
//   date: DateType[];
//   normalPrice: number;
//   peakPrice: number;
// };

// export const columns: ColumnDef<PriceItem>[] = [
//   {
//     id: "day",
//     header: "روز",
//     accessorFn: (row) => row.day ?? "",
//     // size: 100,
//   },
//   {
//     id: "date",
//     header: "تاریخ",
//     accessorFn: (row) => row.date ?? "",
//     // size: 100,
//   },
//   {
//     id: "normalPrice",
//     header: "قیمت نرمال",
//     accessorFn: (row) => row.normalPrice ?? "",
//     // size: 100,
//   },
//   {
//     id: "PeakPrice",
//     header: "قیمت پیک",
//     accessorFn: (row) => row.peakPrice ?? "",
//     // size: 100,
//   },
// ];

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
    // console.log(days);
    return days;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <div className="">
          <Calendar
            value={selectedMonth}
            onChange={setSelectedMonth}
            onlyMonthPicker
            calendar={persian}
            locale={persian_fa}
          />
          <div className="mt-10">
            {selectedMonth && (
              <>
                {/* <CustomInput name="normalPrice" label="قیمت نرمال" inputType="number" isRequired={false}/>
                <CustomInput name="peakPrice" label="قیمت پیک" inputType="number" isRequired={false}/> */}
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>روز</TableHead>
                      <TableHead>تاریخ</TableHead>
                      <TableHead>قیمت نرمال</TableHead>
                      <TableHead>قیمت پیک</TableHead>
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
                        <TableCell>
                          <Input type="number" placeholder="0" />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RoomTypePriceForm;
