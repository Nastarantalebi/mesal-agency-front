import type { ColumnDef } from "@tanstack/react-table";
import type { UsersListResponse } from "../types";

export const UserListColumns: ColumnDef<UsersListResponse>[] = [
  {
    id: "index",
    header: "ردیف",
    cell: ({ row }) => row.index + 1,
    size: 30,
  },
  // { accessorKey: "name", header: "نام اقامتگاه" },
  {
    id: "mobile",
    header: "شماره موبایل",
    accessorFn: (row) => row.mobile ?? "",
  },
  {
    id: "is_staff",
    header: "مدیر",
    accessorFn: (row) => row.is_staff ? "مدیر" : "کاربر",
  },
];