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
import React, { useState, type ReactNode } from "react";
import ListEdit from "./ListEdit";
import { Button } from "../ui/button";
import CustomTableHeader from "./CustomTableHeader";
import type { TPaginatedResponse } from "@/types";
import ListPagination from "./ListPagination";

interface Props<TData> {
  columns: ColumnDef<TData>[];
  data: TPaginatedResponse<TData>;
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

export function CustomDataTable<TData extends RowWithId>({
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
}: Props<TData>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [currentPage, setCurrentPage] = useState(1);

  const table = useReactTable({
    data: data.results,
    columns,
    state: { columnFilters },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const pageCount = data?.count ? Math.ceil(data.count / 10) : 0;

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
                  colSpan={columns.length + (showAction ? 1 : 0)}
                  className="h-96 text-center"
                >
                  <div className="flex flex-col justify-center items-center">
                    <img
                      src="/No data-amico.svg"
                      alt="no data"
                      className="w-70"
                    />
                    <span className="text-gray-500">داده ای وجود ندارد!</span>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="mt-7 flex justify-center">
          <ListPagination
            currentPage={currentPage}
            pageCount={pageCount}
            onPageChange={setCurrentPage}
          ></ListPagination>
        </div>
      </div>
    </div>
  );
}
