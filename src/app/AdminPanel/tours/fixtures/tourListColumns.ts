import type { ColumnDef } from "@tanstack/react-table";
import type { TtourItems } from "../types/types";

export const tourListColumns: ColumnDef<TtourItems>[] = [
  {
    id: "index",
    header: "ردیف",
    cell: ({ row }) => row.index + 1,
    size: 30,
  },
  { accessorKey: "title", header: "نام تور" },
  {
    id: "category",
    header: "نوع تور",
    accessorFn: (row) => row.category ?? "",
  },
  {
    id: "description",
    header: "توضیحات",
    accessorFn: (row) => row.description ?? "",
  },
  {
    id: "duration_days",
    header: "تعداد روزها",
    accessorFn: (row) => row.duration_days ?? "",
  },
  {
    id: "vehicle_type",
    header: "نوع وسیله نقلیه",
    accessorFn: (row) => row.vehicle_type ?? "",
  },

//   {
//     id: "province",
//     header: "استان",
//     accessorFn: (row) => row.city?.province?.name ?? "",
//   },
//   {
//     id: "city",
//     header: "شهر",
//     accessorFn: (row) => row.city?.name ?? "",
//   },
];