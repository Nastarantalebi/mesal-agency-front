import CustomButton from "@/components/form/CustomButton";
import {
  miladiToShamsi,
  shamsiToMiladi,
} from "@/components/form/DateConverter";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form } from "@/components/ui/form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useGetData from "@/services/useGetData";
import { useEffect, useState } from "react";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { Calendar, DateObject } from "react-multi-date-picker";
import type { TCRoomTypePrices, TRoomTypePricesResponse } from "../../types";
import { accommodation_url } from "@/data/querykeys";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  roomTypePriceInitialValues,
  roomTypePriceValidation,
} from "../../fixtures/Validation";
import usePostData from "@/services/usePostData";
import { toast } from "sonner";
import FormErrorModal from "@/components/FormErrorModal";
import PriceTabs from "./PriceTabs";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  AccommodationId: string;
  RoomId?: number | null;
  RoomName?: string | null;
}

const RoomTypePriceForm = ({
  open,
  onOpenChange,
  title,
  AccommodationId,
  RoomId,
  RoomName,
}: Props) => {
  const [selectedMonth, setSelectedMonth] = useState<DateObject | null>(null);
  const [globalNormalPrice, setGlobalNormalPrice] = useState<string>("");
  const [globalPeakPrice, setGlobalPeakPrice] = useState<string>("");
  const [rowPrices, setRowPrices] = useState<
    Record<string, { normalPrice: string; peakPrice: string }>
  >({});
  const [errorOpen, setErrorOpen] = useState(false);

  const dayNames = [
    "شنبه",
    "یکشنبه",
    "دوشنبه",
    "سه‌شنبه",
    "چهارشنبه",
    "پنجشنبه",
    "جمعه",
  ];

  new Map();
  const getDayName = (shamsi: string) => {
    const miladi = shamsiToMiladi(shamsi); // تابعی که داری import کردی
    const date = new Date(miladi);
    return dayNames[date.getDay()];
  };

  const isFriday = (shamsi: string) => {
    const miladi = shamsiToMiladi(shamsi);
    const date = new Date(miladi);
    return date.getDay() === 6; // 5 = جمعه
  };

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

  const days = getDaysInMonth();
  const startDate = shamsiToMiladi(days[0]?.shamsi).replaceAll("/", "-");
  const endDate = shamsiToMiladi(days[days.length - 1]?.shamsi).replaceAll(
    "/",
    "-",
  );
  const errmessage = "ثبت فرم با خطا مواجه شد، لطفاً دوباره تلاش کنید.";

  const submitRoomTypePrices = usePostData<
    TCRoomTypePrices,
    TRoomTypePricesResponse
  >({
    key: ["roomTypePrices", startDate, endDate],
    url: `${accommodation_url}${AccommodationId}/room_types/${RoomId}/prices/?start_date=${startDate}&end_date=${endDate}`,
  });

  const { data: roomTypePricesData } = useGetData<TRoomTypePricesResponse>({
    key: ["roomTypePrices", startDate, endDate],
    url: `${accommodation_url}${AccommodationId}/room_types/${RoomId}/prices/?start_date=${startDate}&end_date=${endDate}`,
    enabled: !!RoomId && !!startDate && !!endDate,
  });

  const normalizeKey = (persianDate: string): string => {
    return persianDate
      .replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d))) // Persian → Latin digits
      .replace(/\/0(\d)/g, "/$1"); // remove zero-padding → "01" becomes "1"
  };

  useEffect(() => {
    if (!roomTypePricesData || roomTypePricesData.length === 0) return;

    const updated = Object.fromEntries(
      roomTypePricesData.map((price) => [
        normalizeKey(miladiToShamsi(price.date)), // → "1404/1/1" ✅
        {
          normalPrice: String(price.normal_price),
          peakPrice: String(price.peak_price),
        },
      ]),
    );

    setRowPrices(updated);
  }, [roomTypePricesData]);

  const handleApplyAll = () => {
    const days = getDaysInMonth();
    setRowPrices((prev) => {
      const updated = { ...prev };
      days.forEach(({ shamsi }) => {
        // shamsi نه day
        updated[shamsi] = {
          normalPrice: globalNormalPrice,
          peakPrice: globalPeakPrice,
        };
      });
      return updated;
    });
  };
  const handleApplyFridays = () => {
    const days = getDaysInMonth();
    setRowPrices((prev) => {
      const updated = { ...prev };
      days.forEach(({ shamsi }) => {
        if (isFriday(shamsi)) {
          updated[shamsi] = {
            normalPrice: globalNormalPrice,
            peakPrice: globalPeakPrice,
          };
        }
      });
      return updated;
    });
  };
  const handleApplyRange = (
    start: string,
    end: string,
    normalPrice: string,
    peakPrice: string,
  ) => {
    const days = getDaysInMonth();
    setRowPrices((prev) => {
      const updated = { ...prev };
      days.forEach(({ shamsi }) => {
        const miladi = shamsiToMiladi(shamsi);
        if (miladi >= shamsiToMiladi(start) && miladi <= shamsiToMiladi(end)) {
          updated[shamsi] = { normalPrice, peakPrice };
        }
      });
      return updated;
    });
  };
  const handleRowChange = (
    shamsi: string,
    field: "normalPrice" | "peakPrice",
    value: string,
  ) => {
    setRowPrices((prev) => ({
      ...prev,
      [shamsi]: {
        ...prev[shamsi],
        [field]: value,
      },
    }));
  };

  // reset row prices when month changes
  const handleMonthChange = (date: DateObject) => {
    setSelectedMonth(date);
    setRowPrices({});
    setGlobalNormalPrice("");
    setGlobalPeakPrice("");
  };

  const form = useForm<TCRoomTypePrices>({
    resolver: zodResolver(roomTypePriceValidation),
    defaultValues: roomTypePriceInitialValues,
  });

  const handleSubmit = () => {
    const days = getDaysInMonth();
    const payload = {
      prices: days.map((item) => ({
        date: shamsiToMiladi(item.shamsi),
        normal_price: Number(rowPrices[item.shamsi]?.normalPrice) || 0, // item.shamsi نه item.day
        peak_price: Number(rowPrices[item.shamsi]?.peakPrice) || 0,
      })),
    };

    submitRoomTypePrices.mutateAsync(payload, {
      onSuccess: () => {
        toast.success("قیمت ها با موفقیت ثبت شد");
        onOpenChange(false);
      },
      onError: () => setErrorOpen(true),
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="bg-primary/20 p-2 rounded mb-3 text-center">{`نوع اتاق ${RoomName}`}</div>
        <div className="">
          <div className="flex items-center justify-center">
            <Calendar
              value={selectedMonth}
              onChange={handleMonthChange}
              onlyMonthPicker
              calendar={persian}
              locale={persian_fa}
            />
          </div>

          <div className="mt-10">
            {selectedMonth && (
              <>
                <PriceTabs
                  selectedMonth={selectedMonth}
                  globalNormalPrice={globalNormalPrice}
                  globalPeakPrice={globalPeakPrice}
                  setGlobalNormalPrice={setGlobalNormalPrice}
                  setGlobalPeakPrice={setGlobalPeakPrice}
                  onApplyAll={handleApplyAll}
                  onApplyFridays={handleApplyFridays}
                  onApplyRange={handleApplyRange}
                />
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleSubmit)}>
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
                        {days.map((item) => (
                          <TableRow key={item.shamsi}>
                            <TableCell
                              className={
                                isFriday(item.shamsi) ? "text-red-500" : ""
                              }
                            >
                              {getDayName(item.shamsi)}
                            </TableCell>
                            <TableCell
                              className={
                                isFriday(item.shamsi) ? "text-red-500" : ""
                              }
                            >
                              {item.shamsi}
                            </TableCell>
                            <TableCell>
                              <Input
                                type="number"
                                value={
                                  rowPrices[item.shamsi]?.normalPrice ?? ""
                                }
                                onChange={(e) =>
                                  handleRowChange(
                                    item.shamsi,
                                    "normalPrice",
                                    e.target.value,
                                  )
                                }
                              />
                            </TableCell>
                            <TableCell>
                              <Input
                                type="number"
                                value={rowPrices[item.shamsi]?.peakPrice ?? ""}
                                onChange={(e) =>
                                  handleRowChange(
                                    item.shamsi,
                                    "peakPrice",
                                    e.target.value,
                                  )
                                }
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    <CustomButton className="mt-5" type="submit">
                      ثبت
                    </CustomButton>
                  </form>
                  <FormErrorModal
                    open={errorOpen}
                    message={errmessage}
                    onOpenChange={setErrorOpen}
                    onAcknowledge={() => setErrorOpen(false)}
                  />
                </Form>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RoomTypePriceForm;
