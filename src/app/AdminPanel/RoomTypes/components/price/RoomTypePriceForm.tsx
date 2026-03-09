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
import useMonthStores from "./monthStore";
import { Checkbox } from "@/components/ui/checkbox";

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
  const { selectedMonth, setSelectedMonth } = useMonthStores();
  const [globalNormalPrice, setGlobalNormalPrice] = useState<string>("");
  const [globalPeakPrice, setGlobalPeakPrice] = useState<string>("");
  const [rowPrices, setRowPrices] = useState<
    Record<
      string,
      {
        adultNormalPrice?: string;
        adultPeakPrice?: string;
        childNormalPrice?: string;
        childPeakPrice?: string;
        phoneCallPrice?: boolean;
      }
    >
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
      roomTypePricesData
        .map((price) => {
          const shamsiDate = miladiToShamsi(price.date);
          const normalizedKey = normalizeKey(shamsiDate);

          if (price.normal_price || price.peak_price) {
            return [
              normalizedKey,
              {
                adult_normal_price: String(price.normal_price),
                adult_peak_price: String(price.peak_price),
              },
            ];
          } else if (price.normal_child_price || price.peak_child_price) {
            return [
              normalizedKey,
              {
                child_normal_price: String(price.normal_child_price),
                child_peak_price: String(price.peak_child_price),
              },
            ];
          } else {
            return null;
          }
        })
        .filter((pair) => pair !== null),
    );

    setRowPrices(updated);
  }, [roomTypePricesData]);

  const whatDay = (shamsi: string) => {
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

  const handleApplyAdultSelectedDays = (selectedDays: string[]) => {
    setRowPrices((prev) => {
      const updated = { ...prev };

      days.forEach(({ shamsi }) => {
        const dayName = whatDay(shamsi);
        if (selectedDays.includes(dayName)) {
          updated[shamsi] = {
            ...updated[shamsi],
            adultNormalPrice: globalNormalPrice,
            adultPeakPrice: globalPeakPrice,
          };
        }
      });

      // console.log(`AdultSelectedDays: ${updated}`)
      return updated;
    });
  };
  const handleApplyChildSelectedDays = (selectedDays: string[]) => {
    setRowPrices((prev) => {
      const updated = { ...prev };

      days.forEach(({ shamsi }) => {
        const dayName = whatDay(shamsi);
        if (selectedDays.includes(dayName)) {
          updated[shamsi] = {
            ...updated[shamsi],
            childNormalPrice: globalNormalPrice,
            childPeakPrice: globalPeakPrice,
          };
        }
      });

      return updated;
    });
  };

  const handleChildApplyRange = (
    start: string,
    end: string,
    childNormalPrice?: string,
    childPeakPrice?: string,
  ) => {
    const days = getDaysInMonth();
    setRowPrices((prev) => {
      const updated = { ...prev };
      days.forEach(({ shamsi }) => {
        const miladi = shamsiToMiladi(shamsi);
        if (miladi >= shamsiToMiladi(start) && miladi <= shamsiToMiladi(end)) {
          updated[shamsi] = {
            ...updated[shamsi],
            childNormalPrice: childNormalPrice,
            childPeakPrice: childPeakPrice,
          };
        }
      });
      return updated;
    });
  };
  const handleAdultApplyRange = (
    start: string,
    end: string,
    adultNormalPrice?: string,
    adultPeakPrice?: string,
  ) => {
    const days = getDaysInMonth();
    setRowPrices((prev) => {
      const updated = { ...prev };
      days.forEach(({ shamsi }) => {
        const miladi = shamsiToMiladi(shamsi);
        if (miladi >= shamsiToMiladi(start) && miladi <= shamsiToMiladi(end)) {
          updated[shamsi] = {
            ...updated[shamsi],
            adultNormalPrice: adultNormalPrice,
            adultPeakPrice: adultPeakPrice,
          };
        }
      });
      return updated;
    });
  };
  const handleRowChange = (
    shamsi: string,
    field:
      | "adultNormalPrice"
      | "adultPeakPrice"
      | "childNormalPrice"
      | "childPeakPrice",
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
    setSelectedMonth?.(date);
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
        normal_price: Number(rowPrices[item.shamsi]?.adultNormalPrice) || 0,
        normal_child_price:
          Number(rowPrices[item.shamsi]?.childNormalPrice) || 0,
        peak_price: Number(rowPrices[item.shamsi]?.adultPeakPrice) || 0,
        peak_child_price: Number(rowPrices[item.shamsi]?.childPeakPrice) || 0,
        phone_call_price: rowPrices[item.shamsi]?.phoneCallPrice || false,
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

  const handlePhoneCallPriceChange = (shamsi: string, isChecked: boolean) => {
    setRowPrices((prev) => ({
      ...prev,
      [shamsi]: {
        ...prev[shamsi],
        phone_call_price: isChecked,
      },
    }));
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
                  globalNormalPrice={globalNormalPrice}
                  globalPeakPrice={globalPeakPrice}
                  setGlobalNormalPrice={setGlobalNormalPrice}
                  setGlobalPeakPrice={setGlobalPeakPrice}
                  onApplyAdultRange={handleAdultApplyRange}
                  onApplyChildRange={handleChildApplyRange}
                  onApplyAdultSelectedDay={handleApplyAdultSelectedDays}
                  onApplyChildSelectedDay={handleApplyChildSelectedDays}
                />
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>روز</TableHead>
                          <TableHead>تاریخ</TableHead>
                          <TableHead>قیمت نرمال بزرگسال</TableHead>
                          <TableHead>قیمت پیک بزرگسال</TableHead>
                          <TableHead>قیمت نرمال کودک</TableHead>
                          <TableHead>قیمت پیک کودک</TableHead>
                          <TableHead>اطلاع قیمت به صورت تلفنی</TableHead>
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
                                  rowPrices[item.shamsi]?.adultNormalPrice ?? ""
                                }
                                onChange={(e) =>
                                  handleRowChange(
                                    item.shamsi,
                                    "adultNormalPrice",
                                    e.target.value,
                                  )
                                }
                              />
                            </TableCell>
                            <TableCell>
                              <Input
                                type="number"
                                value={
                                  rowPrices[item.shamsi]?.adultPeakPrice ?? ""
                                }
                                onChange={(e) =>
                                  handleRowChange(
                                    item.shamsi,
                                    "adultPeakPrice",
                                    e.target.value,
                                  )
                                }
                              />
                            </TableCell>
                            <TableCell>
                              <Input
                                type="number"
                                value={
                                  rowPrices[item.shamsi]?.childNormalPrice ?? ""
                                }
                                onChange={(e) =>
                                  handleRowChange(
                                    item.shamsi,
                                    "childNormalPrice",
                                    e.target.value,
                                  )
                                }
                              />
                            </TableCell>
                            <TableCell>
                              <Input
                                type="number"
                                value={
                                  rowPrices[item.shamsi]?.childPeakPrice ?? ""
                                }
                                onChange={(e) =>
                                  handleRowChange(
                                    item.shamsi,
                                    "childPeakPrice",
                                    e.target.value,
                                  )
                                }
                              />
                            </TableCell>
                            <TableCell>
                              <div className="pr-10">
                                <Checkbox
                                  checked={
                                    rowPrices[item.shamsi]?.phoneCallPrice
                                  }
                                  onChange={(event) => {
                                    handlePhoneCallPriceChange(
                                      item.shamsi,
                                      (event.target as HTMLInputElement)
                                        .checked,
                                    );
                                  }}
                                />
                              </div>
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
