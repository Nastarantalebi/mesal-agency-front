import type { ColumnDef } from "@tanstack/react-table";
import type { TtourTemplateItems } from "../types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const tourTemplateListColumns: ColumnDef<TtourTemplateItems>[] = [
  {
    id: "index",
    header: "ردیف",
    cell: ({ row }) => row.index + 1,
    size: 20,
  },
  { accessorKey: "title", header: "نام تور", size: 50 },
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
    size: 80,
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
    header: "توضیحات",
    id: "short_description",
    cell: ({ row }) => {
      const text = row.original.short_description ?? "";
      const maxLength = 40;
      const truncated =
        text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

      if (text.length <= maxLength) return <span>{text}</span>;

      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="cursor-default">{truncated}</span>
            </TooltipTrigger>
            <TooltipContent>
              <p>{text}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
];
