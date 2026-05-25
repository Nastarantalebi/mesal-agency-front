import type { ColumnDef } from "@tanstack/react-table";
import type { TdepartureResponse } from "../types";
import { miladiToShamsi } from "@/components/form/DateConverter";

export const DepartureListColumns : ColumnDef<TdepartureResponse>[] = [
  {
    id: "index",
    header: "ردیف",
    cell: ({ row }) => row.index + 1,
    size: 10,
  },
  {
    id: "tour.title",
    header: "نام تور",
    accessorFn: (row) => row.tour.title ?? "",
        size: 50,
  },
  {
    id: "tour.category",
    header: "نوع تور",
    accessorFn: (row) => row.tour.category.label ?? "",
            size: 50,
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
            size: 50,
  },
  {
    id: "tour.country",
    header: "کشور",
    accessorFn: (row) => row.tour.country ?? "",
            size: 50,
  },
  {
    id: "start",
    header: "تاریخ شروع",
    accessorFn: (row) => miladiToShamsi(row.start) ?? "",
            size: 70,
  },
  {
    id: "end",
    header: "تاریخ پایان",
    accessorFn: (row) => miladiToShamsi(row.end) ?? "",
            size: 70,
  },
  {
    id: "duration_days",
    header: "تعداد روز",
    accessorFn: (row) => row.duration_days ?? "",
            size: 30,
  },
  {
    id: "available_seats",
    header: "ظرفیت",
    accessorFn: (row) => row.available_seats ?? "",
            size: 30,
  },
  {
    id: "price",
    header: "قیمت",
    accessorFn: (row) => row.price?? "",
            size: 50,
  },
  {
    id: "status",
    header: "وضعیت",
    accessorFn: (row) => row.status.label?? "",
            size: 50,
  },
];