import type { ColumnDef } from "@tanstack/react-table";
import type { TourDepartureItem } from "../types";
import { miladiToShamsi } from "@/components/form/DateConverter";

export const TourListColumns: ColumnDef<TourDepartureItem>[] = [
  {
    id: "index",
    header: "ردیف",
    cell: ({ row }) => row.index + 1,
    size: 30,
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
    accessorFn: (row) => row.available_seats?? "",
  },
];