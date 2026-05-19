import type { ColumnDef } from "@tanstack/react-table";
import type { TourItem } from "../types";

export const TourListColumns: ColumnDef<TourItem>[] = [
  {
    id: "index",
    header: "ردیف",
    cell: ({ row }) => row.index + 1,
    size: 30,
  },
  { accessorKey: "name", header: "نام تور" },
  {
    id: "start",
    header: "تاریخ شروع",
    accessorFn: (row) => row.start ?? "",
  },
  {
    id: "end",
    header: "تاریخ پایان",
    accessorFn: (row) => row.start ?? "",
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