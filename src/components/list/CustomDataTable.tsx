import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import ListEdit from "./ListEdit";
import ListImage from "./ListImage";

interface Props<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  placeholder: string;
  onEdit?: (id: string) => void;
  onImg?: (id: string) => void;
  onRowClick?: (id: string) => void;
}

type RowWithId = { id: string | number };

export function CustomDataTable<TData extends RowWithId, TValue>({
  columns,
  data,
  placeholder,
  onEdit,
  onImg,
  onRowClick,
}: Props<TData, TValue>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );

  const table = useReactTable({
    data,
    columns,
    state: { columnFilters },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div>
      <div className="relative py-4 max-w-3xs">
        <Input
          placeholder={placeholder}
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="pl-9"
        />
        <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      </div>
      <div className=" mx-auto overflow-x-auto rounded-md border">
        <Table className="w-full table-fixed">
          <colgroup>
            {table.getAllLeafColumns().map((col) => (
              <col key={col.id} style={{ width: `${col.getSize()}px` }} />
            ))}
          </colgroup>

          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
                <TableHead className="w-10">عملیات</TableHead>
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={
                    onRowClick
                      ? () => onRowClick(String(row.original.id))
                      : undefined
                  }
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                  <div>
                    {onEdit && (
                      <TableCell>
                        <ListEdit id={String(row.original.id)} onClick={onEdit} />
                      </TableCell>
                    )}
                    {onImg && (
                      <TableCell>
                        <ListImage id={String(row.original.id)} onClick={onImg} />
                      </TableCell>
                    )}
                  </div>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  داده ای برای نمایش وجود ندارد!
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
