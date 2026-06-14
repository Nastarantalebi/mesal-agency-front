import { shamsiToMiladi } from "@/components/form/DateConverter";
import { useFieldArray, useForm } from "react-hook-form";
import type { Props, TCRoomTypePrices } from "../../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { roomTypePriceInitialValues, roomTypePriceValidation } from "../../fixtures/Validation";
import { useEffect } from "react";
import useMonthStores from "./monthStore";
import { getDaysInMonth } from "@/lib/getDaysInMonth";
import { useRoomTypePrice } from "../../services/useRoomType";
import { Calendar, type DateObject } from "react-multi-date-picker";
import { toast } from "sonner";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import TableForm from "@/_components/Form/tableForm/TableForm";
import { DataThead, initialEntries } from "./fixtures";
import FormComponent from "@/_components/Form/Form";
import PriceTabs from "./PriceTabs";

const PriceForm = ({
  AccommodationId,
  RoomTypeId,
}: Props) => {
  const { selectedMonth, setSelectedMonth } = useMonthStores();


  const form = useForm<TCRoomTypePrices>({
    resolver: zodResolver(roomTypePriceValidation),
    defaultValues: roomTypePriceInitialValues,
  });

  console.log(form.watch())
  console.log(form.formState.errors)

  const { fields } = useFieldArray({
    control: form.control,
    name: "prices",
  });

  const dayNames = [
    "یکشنبه",
    "دوشنبه",
    "سه‌شنبه",
    "چهارشنبه",
    "پنجشنبه",
    "جمعه",
    "شنبه",
  ];

  const getDayName = (shamsi: string) => {
    const miladi = shamsiToMiladi(shamsi); // تابعی که داری import کردی
    const date = new Date(miladi);
    return dayNames[date.getDay()];
  };

  const isFriday = (shamsi: string) => {
    const miladi = shamsiToMiladi(shamsi);
    const date = new Date(miladi);
    return date.getDay() === 5;
  };

  const days = getDaysInMonth(selectedMonth);
  const startDate = shamsiToMiladi(days[0]?.shamsi).replaceAll("/", "-");
  const endDate = shamsiToMiladi(days[days.length - 1]?.shamsi).replaceAll(
    "/",
    "-",
  );

  const { getRoomTypePrices, postRoomTypePrices } = useRoomTypePrice(
    AccommodationId,
    RoomTypeId!,
    startDate,
    endDate,
  );


  useEffect(() => {
    form.reset({
      prices: days.map((day) => {
        const item = getRoomTypePrices.data?.find(
          (p) => p.date === shamsiToMiladi(day.shamsi),
        );
        return {
          date: day.shamsi,
          day: getDayName(day.shamsi),
          normal_price: String(item?.normal_price) ?? "",
          normal_child_price: String(item?.normal_child_price) ?? "",
          peak_price: String(item?.peak_price) ?? "",
          peak_child_price: String(item?.peak_child_price) ?? "",
          phone_call_price: item?.phone_call_price ?? false,
        };
      }),
    });
  }, [getRoomTypePrices.data]);

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

    postRoomTypePrices.mutateAsync(payload, {
      onSuccess: () => {
        toast.success("قیمت ها با  ثبت شد");
      },
    });
  };


  // const handleSelectAllPhone = (checked: boolean) => {
  //   fields.forEach((_, index) => {
  //     form.setValue(`prices.${index}.phone_call_price`, checked, {
  //       shouldValidate: false,
  //     });
  //   });
  // };

  return (
    // <div className="sm:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-4xl max-h-[90vh]">
    <div className="flex flex-row gap-20">
      <div>
        <Calendar
          value={selectedMonth}
          onChange={handleMonthChange}
          onlyMonthPicker
          calendar={persian}
          locale={persian_fa}
        />
      </div>
      <div className="">
        {selectedMonth && (
          <>
            <PriceTabs form={form} />
            <FormComponent<TCRoomTypePrices> form={form} onSubmit={handleSubmit}>          <TableForm<TCRoomTypePrices, "prices">
              form={form}
              isControlable={false}
              dataThead={DataThead}
              name="prices"
              initialItem={initialEntries}
              blankData={true}
              formFields={(index: number) => ({
                fields: [
                  {
                    name: `prices.${index}.date`,
                    readOnly: true,
                    className: isFriday(fields[index]?.date) ? "text-destructive" : "",
                  },
                  {
                    name: `prices.${index}.day`,
                    readOnly: true,
                    className: isFriday(fields[index]?.date) ? "text-destructive" : "",
                  },
                  {
                    name: `prices.${index}.normal_price`,
                    placeholder: "قیمت نرمال بزرگسال",
                    money: true,
                    showValueInWord: false,
                  },
                  {
                    name: `prices.${index}.peak_price`,
                    placeholder: "قیمت پیک بزرگسال",
                    money: true,
                    showValueInWord: false,

                  },
                  {
                    name: `prices.${index}.normal_child_price`,
                    placeholder: "قیمت نرمال کودک",
                    money: true,
                    showValueInWord: false,

                  },

                  {
                    name: `prices.${index}.peak_child_price`,
                    placeholder: "قیمت پیک کودک",
                    money: true,
                    showValueInWord: false,

                  },
                  {
                    name: `prices.${index}.phone_call_price`,
                    type: "switch",
                    onValue: true,
                    offValue: false
                  },
                ],
              })}
            /></FormComponent>

          </>
        )}
      </div>
    </div>
    // </div>
  )
}

export default PriceForm