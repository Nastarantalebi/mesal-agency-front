import type { ColumnDef } from "@tanstack/react-table";
import type { TRoomTypeResponse } from "../types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const RoomTypefields = () => {
  const fields: ColumnDef<TRoomTypeResponse>[] = [
    {
      id: "index",
      header: "ردیف",
      cell: ({ row }) => row.index + 1,
      size: 10,
    },
    {
      id: "name",
      header: "نوع اتاق",
      accessorFn: (row) => row.name ?? "",
      size: 50,
    },
    {
      id: "extraPerson",
      header: "تعداد نفرات اضافه",
      accessorFn: (row) => row.extraPerson ?? 0,
      size: 50,
    },
    {
      id: "capacity",
      header: "ظرفیت",
      accessorFn: (row) => row.capacity ?? "",
      size: 50,
    },
    {
      id: "breakfast",
      header: "صبحانه",
      accessorFn: (row) => (row.breakfast ? "دارد" : "ندارد"),
      size: 50,
    },
    {
      id: "lunch",
      header: "ناهار",
      accessorFn: (row) => (row.lunch ? "دارد" : "ندارد"),
      size: 50,
    },
    {
      id: "dinner",
      header: "شام",
      accessorFn: (row) => (row.dinner ? "دارد" : "ندارد"),
      size: 50,
    },
    {
      id: "dinner",
      header: "شام",
      accessorFn: (row) => (row.description ? "دارد" : "ندارد"),
      size: 50,
    },
    {
      header: "توضیحات",
      id: "description",
      cell: ({ row }) => {
        const text = row.original.description ?? "";
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
  return fields;
};

export default RoomTypefields;
