import type { ColumnDef } from "@tanstack/react-table";
import type { TdepartureResponse } from "../types";
import { miladiToShamsi } from "@/components/form/DateConverter";

export const DepartureListColumns : ColumnDef<TdepartureResponse>[] = [
  {
    id: "index",
    header: "ردیف",
    cell: ({ row }) => row.index + 1,
    size: 30,
  },
  {
    id: "tour.title",
    header: "نام تور",
    accessorFn: (row) => row.tour.title ?? "",
  },
  {
    id: "tour.category",
    header: "نوع تور",
    accessorFn: (row) => row.tour.category.label ?? "",
  },
//   {
//     id: "tour.destination",
//     header: "مقصد",
//     accessorFn: (row) => row.tour.destination ?? "",
//   },
  {
    id: "tour.difficulty",
    header: "سطح سختی",
    accessorFn: (row) => row.tour.difficulty.label ?? "",
  },
  {
    id: "tour.country",
    header: "کشور",
    accessorFn: (row) => row.tour.country ?? "",
  },
  {
    id: "start",
    header: "تاریخ شروع",
    accessorFn: (row) => miladiToShamsi(row.start) ?? "",
  },
  {
    id: "end",
    header: "تاریخ پایان",
    accessorFn: (row) => miladiToShamsi(row.end) ?? "",
  },
  {
    id: "duration_days",
    header: "تعداد روز",
    accessorFn: (row) => row.duration_days ?? "",
  },
  {
    id: "available_seats",
    header: "ظرفیت",
    accessorFn: (row) => row.available_seats ?? "",
  },
  {
    id: "price",
    header: "قیمت",
    accessorFn: (row) => row.price?? "",
  },
];