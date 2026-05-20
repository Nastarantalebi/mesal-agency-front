import type { ColumnDef } from "@tanstack/react-table";
import type { TtourPlanResponse } from "./validation";
import { miladiToShamsi } from "@/components/form/DateConverter";

export const PlanListColumns : ColumnDef<TtourPlanResponse>[] = [
  {
    id: "index",
    header: "ردیف",
    cell: ({ row }) => row.index + 1,
    size: 30,
  },
  {
    id: "date",
    header: "تاریخ",
    accessorFn: (row) => miladiToShamsi(row.date) ?? "",
  },
  {
    id: "breakfast",
    header: "صبحانه",
    accessorFn: (row) => row.breakfast ? "دارد" : "ندارد",
},
{
  id: "lunch",
  header: "ناهار",
  accessorFn: (row) => row.lunch ? "دارد" : "ندارد",
},
  {
    id: "dinner",
    header: "شام",
    accessorFn: (row) => row.dinner ? "دارد" : "ندارد",
  },

];