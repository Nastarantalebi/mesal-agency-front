// import FormErrorModal from "@/components/form/FormErrorModal";
// import CustomButton from "@/components/form/CustomButton";
// import { shamsiToMiladi } from "@/components/form/DateConverter";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Form } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { getDaysInMonth } from "@/lib/getDaysInMonth";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useEffect, useState } from "react";
// import persian from "react-date-object/calendars/persian";
// import persian_fa from "react-date-object/locales/persian_fa";
// import { Controller, useFieldArray, useForm } from "react-hook-form";
// import { Calendar, DateObject } from "react-multi-date-picker";
// import { toast } from "sonner";
// import {
//   roomTypePriceInitialValues,
//   roomTypePriceValidation,
// } from "../../fixtures/Validation";
// import { useRoomTypePrice } from "../../services/useRoomType";
// import type { Props, TCRoomTypePrices } from "../../types";
// import PriceTabs from "./PriceTabs";
// import useMonthStores from "./monthStore";

// const RoomTypePriceForm = ({
//   onOpenChange,
//   AccommodationId,
//   RoomTypeId,
// }: Props) => {
//   const { selectedMonth, setSelectedMonth } = useMonthStores();

//   const [errorOpen, setErrorOpen] = useState(false);

//   const form = useForm<TCRoomTypePrices>({
//     resolver: zodResolver(roomTypePriceValidation),
//     defaultValues: roomTypePriceInitialValues,
//   });

//   const { fields } = useFieldArray({
//     control: form.control,
//     name: "prices",
//   });

//   const dayNames = [
//     "شنبه",
//     "یکشنبه",
//     "دوشنبه",
//     "سه‌شنبه",
//     "چهارشنبه",
//     "پنجشنبه",
//     "جمعه",
//   ];

//   const getDayName = (shamsi: string) => {
//     const miladi = shamsiToMiladi(shamsi); // تابعی که داری import کردی
//     const date = new Date(miladi);
//     return dayNames[date.getDay()];
//   };

//   const isFriday = (shamsi: string) => {
//     const miladi = shamsiToMiladi(shamsi);
//     const date = new Date(miladi);
//     return date.getDay() === 6; // 5 = جمعه
//   };

//   const days = getDaysInMonth(selectedMonth);
//   const startDate = shamsiToMiladi(days[0]?.shamsi).replaceAll("/", "-");
//   const endDate = shamsiToMiladi(days[days.length - 1]?.shamsi).replaceAll(
//     "/",
//     "-",
//   );

//   const { getRoomTypePrices, postRoomTypePrices } = useRoomTypePrice(
//     AccommodationId,
//     RoomTypeId!,
//     startDate,
//     endDate,
//   );

//   const errmessage = "ثبت فرم با خطا مواجه شد، لطفاً دوباره تلاش کنید.";


//   useEffect(() => {
//     form.reset({
//       prices: days.map((day) => {
//         const item = getRoomTypePrices.data?.find(
//           (p) => p.date === shamsiToMiladi(day.shamsi),
//         );
//         return {
//           date: day.shamsi,
//           normal_price: item?.normal_price ?? 0,
//           normal_child_price: item?.normal_child_price ?? 0,
//           peak_price: item?.peak_price ?? 0,
//           peak_child_price: item?.peak_child_price ?? 0,
//           phone_call_price: item?.phone_call_price ?? false,
//         };
//       }),
//     });
//   }, [getRoomTypePrices.data]);

//   // reset row prices when month changes
//   const handleMonthChange = (date: DateObject) => {
//     setSelectedMonth?.(date);
//     form.reset();
//   };

//   const handleSubmit = (value: TCRoomTypePrices) => {
//     const payload = {
//       prices: value.prices.map((item) => ({
//         ...item,
//         date: shamsiToMiladi(item.date),
//       })),
//     };

//     postRoomTypePrices.mutateAsync(payload, {
//       onSuccess: () => {
//         toast.success("قیمت ها با  ثبت شد");
//         onOpenChange?.(false);
//       },
//       onError: () => setErrorOpen(true),
//     });
//   };

//   const handleSelectAllPhone = (checked: boolean) => {
//     fields.forEach((_, index) => {
//       form.setValue(`prices.${index}.phone_call_price`, checked, {
//         shouldValidate: false,
//       });
//     });
//   };

//   return (
//     <div className="sm:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-4xl max-h-[90vh]">
//       <div className="flex flex-row gap-50">
//         <div>
//           <Calendar
//             value={selectedMonth}
//             onChange={handleMonthChange}
//             onlyMonthPicker
//             calendar={persian}
//             locale={persian_fa}
//           />
//         </div>

//         <div className="mt-10">
//           {selectedMonth && (
//             <>
//               <Form {...form}>
//                 <form onSubmit={form.handleSubmit(handleSubmit)}>
//                   <PriceTabs form={form} />
//                   <div className="w-full overflow-hidden rounded-lg border border-border">
//                     <Table>
//                       <TableHeader className="bg-muted/50">
//                         <TableRow>
//                           <TableHead>روز</TableHead>
//                           <TableHead className="border-r border-gray-300 last:border-r-0">
//                             تاریخ
//                           </TableHead>
//                           <TableHead className="border-r border-gray-300 last:border-r-0">
//                             قیمت نرمال بزرگسال
//                           </TableHead>
//                           <TableHead className="border-r border-gray-300 last:border-r-0">
//                             قیمت پیک بزرگسال
//                           </TableHead>
//                           <TableHead className="border-r border-gray-300 last:border-r-0">
//                             قیمت نرمال کودک
//                           </TableHead>
//                           <TableHead className="border-r border-l border-gray-300 last:border-r-0">
//                             قیمت پیک کودک
//                           </TableHead>
//                           <TableHead className="">
//                             <Checkbox
//                               className="mx-2"
//                               // onChange={(checked) => handleSelectAllPhone(checked)}
//                               // checked={selectAllPhone}
//                               onCheckedChange={handleSelectAllPhone}
//                             />
//                             اطلاع قیمت به صورت تلفنی
//                           </TableHead>
//                         </TableRow>
//                       </TableHeader>
//                       <TableBody>
//                         {days.map((item, index) => (
//                           <TableRow key={item.shamsi}>
//                             <TableCell
//                               className={`${isFriday(item.shamsi) ? "text-red-500" : ""}`}
//                             >
//                               {getDayName(item.shamsi)}
//                             </TableCell>
//                             <TableCell
//                               className={`border-r border-gray-200 last:border-r-0 ${isFriday(item.shamsi) ? "text-red-500" : ""}`}
//                             >
//                               {item.shamsi}
//                             </TableCell>
//                             <TableCell className="border-r border-gray-200 last:border-r-0">
//                               <Controller
//                                 name={`prices.${index}.normal_price`}
//                                 control={form.control}
//                                 render={({ field, fieldState }) => (
//                                   <>
//                                     <Input
//                                       {...field}
//                                       type="number"
//                                       dir="ltr"
//                                       onChange={(e) => {
//                                         field.onChange(e.target.valueAsNumber);
//                                       }}
//                                       className={`text-left ${fieldState.error ? "border-red-600" : ""} `}
//                                     />
//                                   </>
//                                 )}
//                               />
//                             </TableCell>
//                             <TableCell className="border-r border-gray-200 last:border-r-0">
//                               <Controller
//                                 name={`prices.${index}.peak_price`}
//                                 control={form.control}
//                                 render={({ field, fieldState }) => (
//                                   <>
//                                     <Input
//                                       {...field}
//                                       type="number"
//                                       dir="ltr"
//                                       onChange={(e) => {
//                                         field.onChange(e.target.valueAsNumber);
//                                       }}
//                                       className={`text-left ${fieldState.error ? "border-red-600" : ""} `}
//                                     />
//                                   </>
//                                 )}
//                               />
//                             </TableCell>
//                             <TableCell className="border-r border-gray-200 last:border-r-0">
//                               <Controller
//                                 name={`prices.${index}.normal_child_price`}
//                                 control={form.control}
//                                 render={({ field, fieldState }) => (
//                                   <>
//                                     <Input
//                                       {...field}
//                                       type="number"
//                                       dir="ltr"
//                                       onChange={(e) => {
//                                         field.onChange(e.target.valueAsNumber);
//                                       }}
//                                       className={`text-left ${fieldState.error ? "border-red-600" : ""} `}
//                                     />
//                                   </>
//                                 )}
//                               />
//                             </TableCell>
//                             <TableCell className="border-r border-l border-gray-200 last:border-r-0">
//                               <Controller
//                                 name={`prices.${index}.peak_child_price`}
//                                 control={form.control}
//                                 render={({ field, fieldState }) => (
//                                   <>
//                                     <Input
//                                       {...field}
//                                       type="number"
//                                       dir="ltr"
//                                       onChange={(e) => {
//                                         field.onChange(e.target.valueAsNumber);
//                                       }}
//                                       className={`text-left ${fieldState.error ? "border-red-600" : ""} `}
//                                     />
//                                   </>
//                                 )}
//                               />
//                             </TableCell>
//                             <TableCell className="border-r border-gray-200 last:border-r-0">
//                               <div className="pr-10">
//                                 <Controller
//                                   name={`prices.${index}.phone_call_price`}
//                                   control={form.control}
//                                   render={({ field }) => (
//                                     <>
//                                       <Checkbox
//                                         // {...field}
//                                         // value={field.value}
//                                         checked={field.value}
//                                         onCheckedChange={(check) => {
//                                           field.onChange(check);
//                                         }}
//                                       />
//                                     </>
//                                   )}
//                                 />
//                               </div>
//                             </TableCell>
//                           </TableRow>
//                         ))}
//                       </TableBody>
//                     </Table>
//                   </div>
//                   <CustomButton className="mt-5 mb-20 " type="submit">
//                     ثبت
//                   </CustomButton>
//                 </form>
//                 <FormErrorModal
//                   open={errorOpen}
//                   message={errmessage}
//                   onOpenChange={setErrorOpen}
//                   onAcknowledge={() => setErrorOpen(false)}
//                 />
//               </Form>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RoomTypePriceForm;
