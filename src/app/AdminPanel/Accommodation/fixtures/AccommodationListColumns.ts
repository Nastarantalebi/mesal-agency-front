import type { ColumnDef } from "@tanstack/react-table";
import type { AccommodationItem } from "../types";

export const AccommodationListColumns: ColumnDef<AccommodationItem>[] = [
  {
    id: "index",
    header: "ردیف",
    cell: ({ row }) => row.index + 1,
    size: 30,
  },
  { accessorKey: "name", header: "نام اقامتگاه" },
  {
    id: "type",
    header: "نوع اقامتگاه",
    accessorFn: (row) => row.type?.name ?? "",
  },
  {
    id: "province",
    header: "استان",
    accessorFn: (row) => row.city?.province?.name ?? "",
  },
  {
    id: "city",
    header: "شهر",
    accessorFn: (row) => row.city?.name ?? "",
  },
];