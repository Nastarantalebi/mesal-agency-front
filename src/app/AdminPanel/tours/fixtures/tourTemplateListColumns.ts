import type { ColumnDef } from "@tanstack/react-table";
import type { TtourTemplateItems } from "../types";

export const tourTemplateListColumns: ColumnDef<TtourTemplateItems>[] = [
  {
    id: "index",
    header: "ردیف",
    cell: ({ row }) => row.index + 1,
    size: 20

  },
  { accessorKey: "title", header: "نام تور", size:50 },
  {
    id: "category",
    header: "نوع تور",
    accessorFn: (row) => row.category.label ?? "",
    size: 50,
  
  },
  {
    id: "vehicle_type",
    header: "نوع وسیله نقلیه",
    accessorFn: (row) => row.vehicle_type?.label ?? "",
    size: 80
  },
  {
    id: "country",
    header: "کشور",
    accessorFn: (row) => row.country ?? "",
        size: 50,
  },
  {
    id: "difficulty",
    header: "سطح برنامه",
    accessorFn: (row) => row.difficulty.label ?? "",
        size: 50,
  },
  {
    id: "age_requirement",
    header: "حداقل سن مورد نیاز",
    accessorFn: (row) => row.age_requirement ?? "",
        size: 70,
  },
  {
    id: "short_description",
    header: "توضیحات",
    accessorFn: (row) => row.short_description ?? "",
    size: 200,  },

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