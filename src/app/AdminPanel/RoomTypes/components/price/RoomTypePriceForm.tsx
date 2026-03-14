import CustomButton from "@/components/form/CustomButton";
import { shamsiToMiladi } from "@/components/form/DateConverter";
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
import { Controller, useForm } from "react-hook-form";
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
import { getDaysInMonth } from "@/lib/getDaysInMonth";

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

  const days = getDaysInMonth(selectedMonth);
  const startDate = shamsiToMiladi(days[0]?.shamsi).replaceAll("/", "-");
  const endDate = shamsiToMiladi(days[days.length - 1]?.shamsi).replaceAll(
    "/",
    "-",
  );

  const form = useForm<TCRoomTypePrices>({
    resolver: zodResolver(roomTypePriceValidation),
    defaultValues: roomTypePriceInitialValues,
  });

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

  // const normalizeKey = (persianDate: string): string => {
  //   return persianDate
  //     .replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d))) // Persian → Latin digits
  //     .replace(/\/0(\d)/g, "/$1"); // remove zero-padding → "01" becomes "1"
  // };

  useEffect(() => {
    // if (!roomTypePricesData || roomTypePricesData.length === 0) return;

    form.reset({
      prices: days.map((day) => {
        const item = roomTypePricesData?.find((p) => p.date === shamsiToMiladi(day.shamsi),);
        return {
          date: day.shamsi,
          normal_price: item?.normal_price ?? 0,
          normal_child_price: item?.normal_child_price ?? 0,
          peak_price: item?.peak_price ?? 0,
          peak_child_price: item?.peak_child_price ?? 0,
          phone_call_price: item?.phone_call_price ?? false,
        };
      }),
    });
  }, [roomTypePricesData]);

  // reset row prices when month changes
  const handleMonthChange = (date: DateObject) => {
    setSelectedMonth?.(date);
    form.reset();
  };

  const handleSubmit = (value: TCRoomTypePrices) => {
    const payload = {
      prices: value.prices.map((item) => ({
        ...item,
        date: shamsiToMiladi(item.date),
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
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <PriceTabs form={form} />
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
                        {days.map((item, index) => (
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
                              <Controller
                                name={`prices.${index}.normal_price`}
                                control={form.control}
                                render={({ field, fieldState }) => (
                                  <>
                                    <Input
                                      {...field}
                                      type="number"
                                      dir="ltr"
                                      onChange={(e) => {
                                        field.onChange(e.target.valueAsNumber);
                                      }}
                                      className={`text-left ${fieldState.error ? "border-red-600" : ""} `}
                                    />
                                  </>
                                )}
                              />
                            </TableCell>
                            <TableCell>
                              <Controller
                                name={`prices.${index}.peak_price`}
                                control={form.control}
                                render={({ field, fieldState }) => (
                                  <>
                                    <Input
                                      {...field}
                                      type="number"
                                      dir="ltr"
                                      onChange={(e) => {
                                        field.onChange(e.target.valueAsNumber);
                                      }}
                                      className={`text-left ${fieldState.error ? "border-red-600" : ""} `}
                                    />
                                  </>
                                )}
                              />
                            </TableCell>
                            <TableCell>
                              <Controller
                                name={`prices.${index}.normal_child_price`}
                                control={form.control}
                                render={({ field, fieldState }) => (
                                  <>
                                    <Input
                                      {...field}
                                      type="number"
                                      dir="ltr"
                                      onChange={(e) => {
                                        field.onChange(e.target.valueAsNumber);
                                      }}
                                      className={`text-left ${fieldState.error ? "border-red-600" : ""} `}
                                    />
                                  </>
                                )}
                              />
                            </TableCell>
                            <TableCell>
                              <Controller
                                name={`prices.${index}.peak_child_price`}
                                control={form.control}
                                render={({ field, fieldState }) => (
                                  <>
                                    <Input
                                      {...field}
                                      type="number"
                                      dir="ltr"
                                      onChange={(e) => {
                                        field.onChange(e.target.valueAsNumber);
                                      }}
                                      className={`text-left ${fieldState.error ? "border-red-600" : ""} `}
                                    />
                                  </>
                                )}
                              />
                            </TableCell>
                            <TableCell>
                              <div className="pr-10">
                                <Controller
                                  name={`prices.${index}.phone_call_price`}
                                  control={form.control}
                                  render={({ field }) => (
                                    <>
                                      <Checkbox
                                        // {...field}
                                        checked={field.value}
                                        onCheckedChange={(check) => {
                                          field.onChange(check);
                                        }}
                                      />
                                    </>
                                  )}
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
