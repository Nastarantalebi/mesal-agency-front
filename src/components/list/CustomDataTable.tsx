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
import ListEdit from "./ListEdit";
import { Button } from "../ui/button";
import CustomTableHeader from "./CustomTableHeader";

interface Props<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onEdit?: (rowData: TData) => void;
  onImg?: (id: string) => void;
  onFeature?: (id: string) => void;
  onBed?: (id: string) => void;
  onRowClick?: (rowData: TData) => void;
  extraAction?: (rowData: TData) => ReactNode;
  onAdd?: () => void;
  showAction: boolean;
  customAddText?: string;
  searchValue: string;
  onSearchChange: (value: string) => void;
  onSearch: (value: string) => void;
  searchPlaceHolder: string;
  showAddButton?: boolean;
}

type RowWithId = { id: string | number };

export function CustomDataTable<TData extends RowWithId, TValue>({
  columns,
  data,
  onEdit,
  onRowClick,
  extraAction,
  onAdd,
  customAddText = "افزودن جدید",
  showAction = true,
  searchPlaceHolder,
  onSearch,
  onSearchChange,
  searchValue,
  showAddButton = true,
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
      <div className="mx-auto overflow-x-auto rounded-2xl flex flex-col gap-3 bg-primary/10 p-5">
        <CustomTableHeader
          customAddText={customAddText}
          searchValue={searchValue}
          onSearchChange={onSearchChange}
          onSearch={onSearch}
          placeholder={searchPlaceHolder}
          onAdd={onAdd!}
          showAddButton={showAddButton}
        />
        <Table className="w-full table-fixed border border-primary">
          <colgroup>
            {table.getAllLeafColumns().map((col) => (
              <col key={col.id} style={{ width: `${col.getSize()}px` }} />
            ))}
          </colgroup>

          <TableHeader className="bg-primary-90 ">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
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
                {showAction && (
                  <TableHead className="w-32 text-white">عملیات</TableHead>
                )}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, index) => (
                <TableRow
                  className={`border border-primary border-dashed ${index % 2 === 0 && "bg-gray-50"}`}
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      className="border-r border-primary"
                      key={cell.id}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                  <TableCell className="border-x border-primary">
                    <div className="flex items-center gap-1">
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
                        <ListEdit onClick={() => onEdit(row.original)} />
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
