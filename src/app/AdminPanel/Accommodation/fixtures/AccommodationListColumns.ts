import type { ColumnDef } from "@tanstack/react-table";
import type { AccommodationItem } from "../types";
import { miladiToShamsi } from "@/components/form/DateConverter";

export const AccommodationListColumns: ColumnDef<AccommodationItem>[] = [
  {
    id: "index",
    header: "ردیف",
    cell: ({ row }) => row.index + 1,
    size: 30,
  },
  { accessorKey: "name", header: "نام اقامتگاه", size: 50, },
  {
    id: "type",
    header: "نوع اقامتگاه",
    accessorFn: (row) => row.type?.name ?? "",size: 50,
  },
  {
    id: "province",
    header: "استان",
    accessorFn: (row) => row.city?.province?.name ?? "",size: 50,
  },
  {
    id: "city",
    header: "شهر",
    accessorFn: (row) => row.city?.name ?? "",size: 50,
  },
  {
    id: "manufacture_date",
    header: "سال ساخت",
    accessorFn: (row) => miladiToShamsi(row.manufacture_date) ?? "",size: 50,
  },
  {
    id: "max_guests",
    header: "ماکزیمم تعداد مهماان",
    accessorFn: (row) => row.max_guests ?? "",size: 50,
  },
];