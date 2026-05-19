import type { ColumnDef } from "@tanstack/react-table";
import type { TtourTemplateItems } from "../types";

export const tourTemplateListColumns: ColumnDef<TtourTemplateItems>[] = [
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
    accessorFn: (row) => row.category.label ?? "",
  },
  {
    id: "vehicle_type",
    header: "نوع وسیله نقلیه",
    accessorFn: (row) => row.vehicle_type?.label ?? "",
  },
  {
    id: "country",
    header: "کشور",
    accessorFn: (row) => row.country ?? "",
  },
  {
    id: "difficulty",
    header: "سطح برنامه",
    accessorFn: (row) => row.difficulty.label ?? "",
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