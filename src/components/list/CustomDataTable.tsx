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
import React, { type ReactNode } from "react";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import ListEdit from "./ListEdit";
import { Button } from "../ui/button";


interface Props<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  placeholder: string;
  onEdit?: (rowData: TData) => void;
  onImg?: (id: string) => void;
  onFeature?: (id: string) => void;
  onBed?: (id: string) => void;
  onRowClick?: (rowData: TData) => void;
  extraAction?: (rowData : TData) => ReactNode;
  showAction: boolean;
}

type RowWithId = { id: string | number };

export function CustomDataTable<TData extends RowWithId, TValue>({
  columns,
  data,
  placeholder,
  onEdit,
  onRowClick,
  extraAction,
  showAction = true
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
      <div className="relative mb-4 max-w-3xs">
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
      <div className="mx-auto overflow-x-auto rounded-sm">
        <Table className="w-full table-fixed border border-primary ">
          <colgroup>
            {table.getAllLeafColumns().map((col) => (
              <col key={col.id} style={{ width: `${col.getSize()}px` }} />
            ))}
          </colgroup>

          <TableHeader className="bg-primary-90 ">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow  key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead className="text-white" key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
                {showAction && <TableHead className="w-32 text-white">عملیات</TableHead>}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                className="border border-primary border-dashed"
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell className="border-r border-primary" key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                  <TableCell className="border-x border-primary">
                    <div className="flex items-center gap-2">
                      {onRowClick && (
                        <Button
                          variant="outline"
                          className="bg-primary/20 hover:bg-primary/40"
                          size="sm"
                          onClick={() => onRowClick(row.original)}
                        >
                          جزییات
                        </Button>
                      )}
                      {onEdit && (
                        <ListEdit
                          onClick={() => onEdit(row.original)}
                        />
                      )}

                      {extraAction?.(row.original)}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 1}
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
