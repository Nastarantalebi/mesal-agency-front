import type { TDataThead } from "@/_components/Form/tableForm/TableForm";


export const DataThead: TDataThead[] = [
  { title: "تاریخ", minWidth: 100, className: "max-w-36" },
  { title: "روز هفته", minWidth: 50, className: "max-w-24" },
  { title: "قیمت نرمال بزرگسال", minWidth: 150 },
  { title: "قیمت پیک بزرگسال", minWidth: 150 },
  { title: "قیمت نرمال کودک	", minWidth: 150 },
  { title: "قیمت پیک کودک", minWidth: 150 },
  { title: "اطلاع قیمت به صورت تلفنی", minWidth: 150 },
];


export const initialEntries = {
  date: "",
  normal_price: '',
  normal_child_price: '',
  peak_price: '',
  peak_child_price: '',
  phone_call_price: false,
};