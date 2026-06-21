import { PlusSquare, Trash2 } from "lucide-react";
import { useCallback, useState } from "react";
import type {
  ArrayPath,
  FieldArrayWithId,
  FieldValues,
  PathValue,
  UseFieldArrayAppend,
  UseFieldArrayInsert,
  UseFieldArrayRemove,
} from "react-hook-form";
import { useHotkeys } from "react-hotkeys-hook";
import CustomDeleteDialog from "../alertDialog/CustomDeleteDialog";
import { sanitizeData } from "@/utils/sanitization";
import { Button } from "@/components/ui/button";

type TProps<
  TFormValues extends FieldValues,
  TName extends ArrayPath<TFormValues>,
> = {
  selectedRows: Set<number>;
  name: TName;
  // rowRefs: React.MutableRefObject<Map<number, HTMLDivElement>>;
  setSelectedRows: React.Dispatch<React.SetStateAction<Set<number>>>;
  initialItem: PathValue<TFormValues, TName>[0];
  // tableRef: React.RefObject<HTMLDivElement | null>;
  extraHeader: React.ReactNode;
  append: UseFieldArrayAppend<TFormValues, TName>;
  insert: UseFieldArrayInsert<TFormValues, TName>;
  allValues: FieldArrayWithId<TFormValues, TName, "id">[];
  remove: UseFieldArrayRemove;
  paneId?: string;
  isInModal?: boolean;
  setEditable: React.Dispatch<React.SetStateAction<number | null>>;
  handleRowFocus: (index: number) => void;
  canEditRow?: (row: PathValue<TFormValues, TName>[0]) => boolean;
};

function FormHeader<
  TFormValues extends FieldValues,
  TName extends ArrayPath<TFormValues>,
>({
  selectedRows,
  // name,
  // rowRefs,
  setSelectedRows,
  // tableRef,
  append,
  extraHeader,
  initialItem,
  setEditable,
  handleRowFocus,
  allValues,
  remove,
  insert,
  paneId,
  isInModal,
  canEditRow,
}: TProps<TFormValues, TName>) {
  // const { dialogHelper, showDialog, hideDialog } = useDialogHelper();
  const [open, setOpen] = useState(false);

  const handleRemoveSelected = useCallback(() => {
    if (selectedRows.size === 0) return;

    const sortedIndexes = Array.from(selectedRows).sort((a, b) => b - a);

    sortedIndexes.forEach((index) => {
      if (canEditRow?.(allValues[index])) remove(index);
    });
    setSelectedRows(new Set());
  }, [selectedRows, setSelectedRows, canEditRow, allValues, remove]);

  const handleDeleteConfirm = useCallback(async () => {
    if (!handleRemoveSelected) return;

    try {
      handleRemoveSelected();
      setOpen(false);
    } catch (error) {
      console.error("Delete failed:", error);
    }
  }, [handleRemoveSelected]);

  const handleDeleteClick = useCallback(() => {
    if (!handleRemoveSelected) return;

    setTimeout(() => {
      setOpen(true);
    }, 0);

    // showDialog({
    //   title: "حذف آیتم",
    //   description: `آیا از حذف ردیف مطمئن هستید؟`,
    // });
  }, [handleRemoveSelected]);

  // Memoized handlers
  const handleAddRow = useCallback(() => {
    const sanitizedItem = sanitizeData(initialItem);
    setEditable(null);

    if (selectedRows.size === 1) {
      const sortedIndexes = Array.from(selectedRows).sort((a, b) => b - a);
      insert(sortedIndexes[0] + 1, sanitizedItem);
      setSelectedRows(new Set());
    } else {
      append(sanitizedItem);
      handleRowFocus(allValues.length);
    }
  }, [
    initialItem,
    setEditable,
    selectedRows,
    insert,
    setSelectedRows,
    handleRowFocus,
    append,
    allValues.length,
  ]);

  useHotkeys(
    "insert",
    () => {
      handleAddRow();
    },
    {
      enableOnFormTags: true, // ✅ Enable in input/textarea/select
      enableOnContentEditable: true, // ✅ Enable in contenteditable elements
      preventDefault: true,
    },
    [],
  );

  // const handleAddAboveRow = useCallback(() => {
  //   const sanitizedItem = sanitizeData(initialItem);

  //   const sortedIndexes = Array.from(selectedRows).sort((a, b) => b - a);

  //   insert(sortedIndexes[0], sanitizedItem);
  //   setSelectedRows(new Set());
  // }, [initialItem, selectedRows, insert, setSelectedRows]);

  // Note: rowRefs intentionally omitted from deps - it's a stable ref, we mutate .current as side effect

  // const handleCopySelected = useCallback(() => {
  //   if (selectedRows.size === 0) return;

  //   const sortedIndexes = Array.from(selectedRows).sort((a, b) => a - b);

  //   for (let i = sortedIndexes.length - 1; i >= 0; i--) {
  //     const index = sortedIndexes[i];
  //     const itemToCopy = allValues[index];
  //     const sanitizedItem = sanitizeData(itemToCopy);
  //     insert(index + 1 + i, sanitizedItem);
  //   }
  //   setSelectedRows(new Set());
  // }, [selectedRows, setSelectedRows, allValues, insert]);

  useHotkeys(
    "delete",
    (e) => {
      e.preventDefault();

      if (selectedRows.size > 0) {
        handleRemoveSelected();
        setSelectedRows(new Set());
      }
    },
    {
      enableOnFormTags: true,
      preventDefault: true,
      scopes: isInModal ? "modal" : `page-${paneId}`,
    },
    [selectedRows, handleRemoveSelected, remove, allValues],
  );

  // Ctrl+C - Copy selected or focused row (scoped to table)
  useHotkeys(
    "ctrl+c",
    (e) => {
      // if (!isInTable()) return;

      if (selectedRows.size > 0) {
        e.preventDefault();
        const sortedIndexes = Array.from(selectedRows).sort((a, b) => a - b);
        for (let i = sortedIndexes.length - 1; i >= 0; i--) {
          const index = sortedIndexes[i];
          const sanitizedItem = sanitizeData(allValues[index]);
          insert(index + 1 + i, sanitizedItem);
        }
        setSelectedRows(new Set());
      }
    },
    {
      scopes: isInModal ? "modal" : `page-${paneId}`,
    },
    [selectedRows, allValues, insert],
  );

  const hasNonEditableSelected = Array.from(selectedRows).some((index) => {
    const row = allValues[index];
    return canEditRow ? !canEditRow(row) : true;
  });

  return (
    <div className="flex items-center justify-between">
      {/* Global action buttons */}
      <div
        className="flex flex-wrap items-center gap-2 bg-gray-10 rounded-md"
        role="toolbar"
        aria-label="عملیات جدول"
      >
        <Button
          variant="outline"
          type="button"
          onClick={handleAddRow}
          className="flex items-center gap-1 border-green-40 text-green-40"
          tabIndex={-1}
          title={
            selectedRows.size === 1
              ? "افزودن ردیف زیر انتخاب‌شده (Insert)"
              : "افزودن ردیف جدید (Insert)"
          }
          aria-label={
            selectedRows.size === 1
              ? "افزودن ردیف زیر انتخاب‌شده"
              : "افزودن ردیف جدید"
          }
        >
          <PlusSquare size={18} aria-hidden="true" />
          <span className="hidden md:block">
            {selectedRows.size === 1 ? "افزودن زیر انتخاب‌شده" : "افزودن ردیف"}
          </span>
        </Button>

        {/* {selectedRows.size === 1 && (
          <Button
            variant="outline"
            type="button"
            onClick={handleAddAboveRow}
            className="flex items-center gap-1 border-green-40 text-green-40"
            tabIndex={-1}
            title="افزودن بالای انتخاب شده"
            aria-label="افزودن بالای انتخاب شده"
          >
            <PlusSquare size={18} aria-hidden="true" />
            <span className="hidden md:block">افزودن بالای انتخاب شده</span>
          </Button>
        )} */}

        <Button
          variant="outline"
          type="button"
          tabIndex={-1}
          onClick={handleDeleteClick}
          disabled={selectedRows.size === 0 || hasNonEditableSelected}
          className="flex items-center gap-1 border-destructive text-destructive"
          title={`حذف ${selectedRows.size} ردیف انتخاب‌شده (Delete)`}
          aria-label={`حذف ${selectedRows.size} ردیف انتخاب‌شده`}
        >
          <Trash2 size={18} aria-hidden="true" />
          <span className="hidden md:block">حذف انتخاب‌شده‌ها</span>(
          {selectedRows.size})
        </Button>

        <CustomDeleteDialog
          isOpen={open}
          title="حذف آیتم"
          description="آیا از حذف خود اطمینان دارید؟"
          onClose={() => setOpen(false)}
          onConfirm={handleDeleteConfirm}
        />

        {/* <Button
          variant="outline"
          type="button"
          tabIndex={-1}
          onClick={handleCopySelected}
          disabled={selectedRows.size === 0}
          className="flex items-center gap-1 border-primary text-primary"
          aria-label={`کپی ${selectedRows.size} ردیف انتخاب‌شده (ctrl + c)`}
        >
          <Copy size={16} aria-hidden="true" />
          <span className="hidden md:block">کپی انتخاب‌شده‌ها</span>(
          {selectedRows.size})
        </Button> */}
      </div>
      {extraHeader}
    </div>
  );
}

export default FormHeader;
