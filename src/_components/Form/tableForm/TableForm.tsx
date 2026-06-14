import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  useFieldArray,
  type ArrayPath,
  type FieldValues,
  type PathValue,
  type UseFormReturn,
} from "react-hook-form";
import FormHeader from "./FormHeader";
import FormsRow from "./FormsRow";
import { useFocusRowStore } from "./rowFocusState";
import { cn } from "@/lib/utils";
import type { TFormData } from "@/types";

import { Table, TableRow,   TableBody,
  TableHead,
  TableHeader, } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";

export type TDataThead = {
  title: string;
  minWidth: number;
  className?: string;
};

export type TableDynamicFormProps<
  TFormValues extends FieldValues,
  TName extends ArrayPath<TFormValues>,
> = {
  name: TName;
  form: UseFormReturn<TFormValues, any, TFormValues>;
  initialItem: PathValue<TFormValues, TName>[0];
  dataThead: TDataThead[];
  // formFields?: (index: number) => TFormData<TFormValues>[];
  footer?: React.ReactNode;
  blankData?: boolean;
  // rowFooter?: (index: number) => ReactNode;
  extraHeader?: React.ReactNode;
  paneId?: string;
  isInModal?: boolean;
  formFields: (
    index: number,
    form: UseFormReturn<TFormValues, any, TFormValues>,
    extra?: { [key: string]: any },
  ) => {
    fields: TFormData<TFormValues>[];
  };
  extra?: { [key: string]: any };
  isControlable?: boolean;
  canEditRow?: (row: PathValue<TFormValues, TName>[0]) => boolean;
};

export default function TableForm<
  TFormValues extends FieldValues,
  TName extends ArrayPath<TFormValues>,
>({
  name,
  form,
  initialItem,
  dataThead,
  formFields,
  footer,
  blankData = false,
  // rowFooter,
  extraHeader,
  paneId,
  isInModal,
  extra,
  isControlable = true,
  canEditRow = () => true,
}: TableDynamicFormProps<TFormValues, TName>): React.ReactElement {
  const { fields, append, remove, insert } = useFieldArray({
    control: form.control,
    name,
  });

  const focusedRowIndex = useFocusRowStore((f) => f.value);
  const setFocusedRowIndex = useFocusRowStore((f) => f.setFocusRow);

  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [editable, setEditable] = useState<number | null>(null);

  const tableRef = useRef<HTMLDivElement>(null);
  // const rowRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  const handleRowFocus = useCallback(
    (index: number) => {
      if (index >= 0) {
        setFocusedRowIndex(index);
      }
    },
    [setFocusedRowIndex],
  );

  useEffect(() => {
    if (fields.length === 0 && blankData) {
      append(initialItem);
    }
  }, [fields.length, blankData, append, initialItem]);

  const isAllSelected =
    fields.length > 0 && selectedRows.size === fields.length;

  const handleSelectAll = useCallback(() => {
    if (isAllSelected) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(fields.map((_, i) => i)));
    }
  }, [isAllSelected, fields]);

  const handleCheckboxKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        handleSelectAll();
      }
    },
    [handleSelectAll],
  );

  const headerProps = {
    selectedRows,
    name,
    setSelectedRows,
    initialItem,
    extraHeader,
    allValues: fields,
    append,
    remove,
    insert,
    paneId,
    isInModal,
    setEditable,
    handleRowFocus,
    canEditRow,
  };

  return (
    <div
      className="w-full space-y-1 col-span-full flex-1 min-h-0 flex flex-col h-full"
      ref={tableRef}
      role="region"
      aria-label="جدول فرم داینامیک"
    >
      {isControlable && <FormHeader<TFormValues, TName> {...headerProps} />}

      <div className="w-full border border-primary rounded-lg overflow-x-auto flex-1 min-h-0 flex flex-col h-full">
        <Table
          // className="w-full"
          // style={{ minWidth: minTableWidth + 96 }}
          className="table-auto"
          role="table"
          aria-label="جدول ورودی داده"
        >
          {/* Header */}
          <TableHeader className="sticky top-0 z-10 bg-primary/80">
            <TableRow className="bg-primary/80 hover:bg-primary-80!" role="row">
              {isControlable && (
                <TableHead
                  className="text-white text-center p-0 w-8"
                  scope="col"
                >
                  <Checkbox
                    onKeyDown={handleCheckboxKeyDown}
                    checked={isAllSelected}
                    onCheckedChange={handleSelectAll}
                    aria-label="انتخاب همه ردیف ها"
                    tabIndex={-1}
                  />
                </TableHead>
              )}

              {dataThead.map(({ minWidth, title, className }, index) => (
                <TableHead
                  key={index}
                  className={cn(
                    "text-center font-bold text-white border-s hover:bg-primary/80!",
                    className,
                  )}
                  colSpan={1}
                  rowSpan={2}
                  style={{ minWidth }}
                >
                  {title}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          {/* Body */}
          <TableBody>
            {fields.map((field, index) => (
              <FormsRow<TFormValues, TName>
                key={field.id}
                selectedRows={selectedRows}
                setSelectedRows={setSelectedRows}
                index={index}
                insert={insert}
                length={fields.length}
                initialItem={initialItem}
                remove={remove}
                formFields={formFields}
                form={form}
                dataThead={dataThead}
                handleRowFocus={handleRowFocus}
                focusedRowIndex={focusedRowIndex}
                editable={editable}
                setEditable={setEditable}
                // name={name}
                extra={extra}
                isControlable={isControlable}
                field={field}
                canEditRow={canEditRow}
              />
            ))}
          </TableBody>

          {footer && <tfoot>{footer}</tfoot>}
        </Table>
      </div>
    </div>
  );
}
