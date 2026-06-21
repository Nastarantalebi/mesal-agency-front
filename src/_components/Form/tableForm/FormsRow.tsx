import type {
  ArrayPath,
  FieldArrayWithId,
  FieldValues,
  PathValue,
  UseFieldArrayInsert,
  UseFieldArrayRemove,
  UseFormReturn,
} from "react-hook-form";
import React, {
  useCallback,
  useEffect,
  useRef,
  type KeyboardEvent,
} from "react";
import type { TFormData } from "@/types";
import type { TDataThead } from "./TableForm";
// import type { TFormData } from "../types";
// import type { TDataThead } from "./TableForm";
// import { cn } from "../../../lib/utils";
import { sanitizeData } from "@/utils/sanitization";
import { cn } from "@/lib/utils";
import FormField from "../FormField";
import useFormField from "../useFormField";
import { useFocusRegistry } from "../FocusRegistryContext";
import { useDialogHelper } from "../alertDialog/useDialogHelper";
import DeleteDialog from "../alertDialog/DeleteDialog";
import { TableCell, TableRow } from "@/components/ui/table";
import { FormControl, FormItem } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";

type FormsRowProps<
  TFormValues extends FieldValues,
  TName extends ArrayPath<TFormValues>,
> = {
  index: number;
  selectedRows: Set<number>;
  setSelectedRows: React.Dispatch<React.SetStateAction<Set<number>>>;
  form: UseFormReturn<TFormValues, any, TFormValues>;
  insert: UseFieldArrayInsert<TFormValues, TName>;
  length: number;
  initialItem: PathValue<TFormValues, TName>[0];
  remove: UseFieldArrayRemove;
  formFields: (
    index: number,
    form: UseFormReturn<TFormValues, any, TFormValues>,
    extra?: Record<string, unknown>,
  ) => { fields: TFormData<TFormValues>[] };
  dataThead: TDataThead[];
  handleRowFocus: (index: number) => void;
  focusedRowIndex: number | null;
  editable: number | null;
  setEditable: React.Dispatch<React.SetStateAction<number | null>>;
  // name: TName;
  extra?: Record<string, unknown>;
  isControlable?: boolean;
  field: FieldArrayWithId<TFormValues, TName, "id">;
  canEditRow?: (row: PathValue<TFormValues, TName>[0]) => boolean;
};

const FormsRow = React.memo(function FormsRow<
  TFormValues extends FieldValues,
  TName extends ArrayPath<TFormValues>,
>({
  selectedRows,
  setSelectedRows,
  form,
  index,
  length,
  initialItem,
  remove,
  formFields,
  dataThead,
  insert,
  handleRowFocus,
  focusedRowIndex,
  // editable,
  // setEditable,
  // name,
  extra,
  isControlable,
  field,
  // canEditRow,
}: FormsRowProps<TFormValues, TName>) {
  const { fields } = formFields(index, form, extra);
  const { dialogHelper, showDialog, hideDialog } = useDialogHelper();

  // ✅ از Context می‌گیره - registry واحد برای کل جدول
  const { register } = useFocusRegistry();

  const rowRef = useRef<HTMLTableRowElement>(null);
  const fieldRenderer = useFormField<TFormValues>();
  const inputRefs = useRef<(HTMLElement | null)[]>([]);

  const isFocused = focusedRowIndex === index;

  // ─── Row actions ──────────────────────────────────────────────

  const handleAddRow = useCallback(() => {
    insert(index + 1, sanitizeData(initialItem));
    handleRowFocus(index + 1);
  }, [initialItem, insert, index, handleRowFocus]);

  const handleAddAboveRow = useCallback(() => {
    insert(index, sanitizeData(initialItem));
    handleRowFocus(index);
  }, [initialItem, insert, index, handleRowFocus]);

  const handleRemoveRow = useCallback(() => {
    remove(index);
    handleRowFocus(index > 0 ? index - 1 : 0);
  }, [field, remove, index, handleRowFocus]);

  // const handleDuplicateRow = useCallback(() => {
  //   const currentValue = form.getValues(
  //     `${name}.${index}` as Path<TFormValues>,
  //   );
  //   insert(index + 1, sanitizeData(currentValue));
  //   handleRowFocus(index + 1);
  // }, [form, name, index, insert, handleRowFocus]);

  // ─── Selection ────────────────────────────────────────────────

  const isSelected = selectedRows.has(index);

  const toggleRowSelection = useCallback(() => {
    setSelectedRows((prev) => {
      const next = new Set(prev);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      next.has(index) ? next.delete(index) : next.add(index);
      return next;
    });
  }, [index, setSelectedRows]);

  const handleCheckboxKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        toggleRowSelection();
      }
    },
    [toggleRowSelection],
  );

  // ─── Delete dialog ────────────────────────────────────────────

  const handleDeleteClick = useCallback(
    (record: unknown) => {
      showDialog({
        title: "حذف آیتم",
        description: "آیا از حذف ردیف مطمئن هستید؟",
        record,
      });
    },
    [showDialog],
  );

  const handleDeleteConfirm = useCallback(async () => {
    try {
      handleRemoveRow();
      // hideDialog();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  }, [handleRemoveRow]);

  // ─── Keyboard handler ─────────────────────────────────────────

  // const { handleFieldKeyDown } = useKeyboardHandler(
  //   index,
  //   handleAddRow,
  //   inputRefs,
  //   length,
  //   rowRef,
  //   handleRowFocus,
  //   isControlable,
  // );

  // ─── Ref registration ─────────────────────────────────────────

  // ✅ ثبت در registry واحد جدول + نگه داشتن inputRefs برای navigation داخلی ردیف
  const handleFieldRef = useCallback(
    (fieldIndex: number, fieldConfig: TFormData<TFormValues>) =>
      (el: HTMLElement | null, rhfRef?: (el: HTMLElement | null) => void) => {
        inputRefs.current[fieldIndex] = el;

        register(index, fieldIndex, el, () => !fieldConfig.readOnly);
        rhfRef?.(el);
      },
    [index, register],
  );

  // ─── Focus effects ────────────────────────────────────────────

  // ✅ وقتی ردیف focused می‌شه ولی editable نیست، focus رو به row می‌ده
  useEffect(() => {
    if (isFocused) {
      requestAnimationFrame(() =>
        rowRef.current?.focus({ preventScroll: false }),
      );
    }
  }, [isFocused]);

  // ─── Row keyboard ─────────────────────────────────────────────

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTableRowElement>) => {
      switch (e.key) {
        case "ArrowDown":
          if (index < length - 1) {
            e.preventDefault();
            handleRowFocus(index + 1);
          }
          break;

        case "ArrowUp":
          if (index > 0) {
            e.preventDefault();
            handleRowFocus(index - 1);
          }
          break;

        case "End":
          e.preventDefault();
          handleRowFocus(length - 1);

          break;

        case "Home":
          e.preventDefault();
          handleRowFocus(0);

          break;

        case "Space":
          if (isControlable) {
            e.preventDefault();
            toggleRowSelection();
          }
          break;

        // case "Enter":
        //   if (!isEditable && canEditRow?.(field)) {
        //     e.preventDefault();
        //     setEditable(index);
        //     requestAnimationFrame(() => {
        //       const all = Array.from(
        //         rowRef.current?.querySelectorAll<HTMLElement>(
        //           FOCUSABLE_SELECTOR,
        //         ) ?? [],
        //       );

        //       const totalCode = all.find(
        //         (el) => el.getAttribute("data-total-code") === "true",
        //       );

        //       const firstFocusable = all.find(isFocusable);
        //       if (totalCode) {
        //         totalCode.focus();
        //       } else if (firstFocusable) {
        //         firstFocusable.focus();
        //       } else {
        //         all[0].focus();
        //       }
        //     });
        //   } else if (!canEditRow?.(field)) {
        //     // onShowError();
        //   }
        //   break;

        case "Escape":
          e.preventDefault();
          e.stopPropagation();
          requestAnimationFrame(() =>
            rowRef.current?.focus({ preventScroll: false }),
          );

          break;

        case "Insert":
          e.preventDefault();
          e.stopPropagation();
          if (isControlable) {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            e.ctrlKey ? handleAddAboveRow() : handleAddRow();
          }
          break;

        case "Delete":
          if (isControlable) {
            e.preventDefault();
            handleDeleteClick(index);
          }
          break;

        case "KeyC":
          if ((e.ctrlKey || e.metaKey) && isControlable) {
            e.preventDefault();
            // handleDuplicateRow();
          }
          break;
      }
    },
    [
      index,
      length,
      isControlable,

      field,
      handleRowFocus,
      toggleRowSelection,

      // onShowError,
      handleAddAboveRow,
      handleAddRow,
      // handleDeleteClick,
    ],
  );

  const handleRowClick = useCallback(() => {
    handleRowFocus(index);
  }, [field, handleRowFocus, index]);

  // ─── Render ───────────────────────────────────────────────────

  // const handleRowBlur = useCallback(
  //   (e: React.FocusEvent<HTMLTableRowElement>) => {
  //     const relatedTarget = e.relatedTarget as HTMLElement | null;

  //     // ✅ اگه focus به داخل popover رفته، کاری نکن
  //     const isInsidePopover =
  //       relatedTarget?.closest('[role="dialog"]') ||
  //       relatedTarget?.closest("[data-radix-popper-content-wrapper]");
  //     if (isInsidePopover) {
  //       return;
  //     }

  //     // اگه focus به یه row دیگه رفت
  //     // const targetRow = relatedTarget?.closest("[data-row-index]");
  //     // if (targetRow) {
  //     //   const targetIndex = parseInt(
  //     //     targetRow.getAttribute("data-row-index") || "-1",
  //     //   );
  //     //   if (targetIndex !== -1 && targetIndex !== index) {
  //     //     if (canEditRow?.(field)) {
  //     //       setEditable(targetIndex);
  //     //     }
  //     //     return;
  //     //   }
  //     //   return;
  //     // }

  //     // اگه focus به خارج از جدول رفت
  //     // const isInsideTable = relatedTarget?.closest('[role="table"]');
  //     // if (!isInsideTable) {
  //     //   // setEditable(null);
  //     // }
  //   },
  //   [setEditable],
  // );

  return (
    <TableRow
      ref={rowRef}
      tabIndex={isFocused ? 0 : -1}
      onKeyDown={handleKeyDown}
      onClick={handleRowClick}
      // onBlur={handleRowBlur}
      data-state={isSelected ? "selected" : undefined}
      data-row-index={index}
      className={cn("h-9 focus:bg-primary/1", {
        // "bg-primary/20": isFocused,
        // "bg-white": isEditable,
      })}
      role="row"
    >
      {isControlable && (
        <TableCell
          className="text-center border-b border-e w-8 p-0"
          role="cell"
        >
          {/* {canEditRow?.(field) && ( */}
          <Checkbox
            className="mx-2"
            onKeyDown={handleCheckboxKeyDown}
            checked={isSelected}
            onCheckedChange={toggleRowSelection}
            aria-label={`انتخاب ردیف ${index + 1}`}
            role="check-box"
            tabIndex={-1}
          />
          {/* )} */}
        </TableCell>
      )}

      {fields.map((fieldConfig, i) => {
        if (
          !fieldConfig ||
          fieldConfig.name === "separator" ||
          fieldConfig.name === "empty"
        ) {
          return null;
        }

        return (
          <TableCell
            key={fieldConfig.name}
            className={cn(
              "p-0 text-center whitespace-nowrap border-e border-b",
              dataThead[i]?.className,
            )}
            style={{
              minWidth: dataThead[i]?.minWidth, // حداقل عرض
              width: "auto", // عرض خودکار
            }}
            data-form-body-wrapper
            role="cell"
          >
            <FormField
              control={form.control}
              name={fieldConfig.name}
              render={({ field, fieldState }) => (
                <FormItem
                  className={cn(
                    "flex-1 *:rounded-none w-full h-full",
                    fieldConfig.className,
                    fieldState.error &&
                      "border-destructive focus-visible:ring-destructive",
                  )}
                  role="gridcell"
                >
                  <FormControl className="w-full">
                    {fieldRenderer({
                      ...fieldConfig,
                      autoFocus:
                        fieldConfig.autoFocus !== undefined
                          ? fieldConfig.autoFocus
                          : index === 0 && i === 0,
                      inputClassName: cn(
                        "w-full flex-1 rounded-none h-full! min-h-9!",
                        "focus-visible:bg-primary-10! focus-visible:border",
                        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                        fieldConfig.inputClassName,
                        {
                          // "bg-transparent! disabled:opacity-90 *:disabled:opacity-90":
                          //   !isEditable,
                          "border border-destructive ": fieldState.error,
                        },
                      ),
                      ref: (el: HTMLElement | null) => {
                        handleFieldRef(i, fieldConfig)(el, field.ref);
                      },
                      field,
                      onKeyDown: (e: KeyboardEvent<HTMLElement>) => {
                        // handleFieldKeyDown(e, i);
                        fieldConfig.onKeyDown?.(e);
                      },
                      errors: form.formState.errors,
                      // onCloseSelect: () =>
                      //   focusNextField(i, fieldConfig, field.value),
                      rowIndex: index,
                      // readOnly: !isEditable || fieldConfig.readOnly,
                      // disabled: !isEditable || fieldConfig.disabled,
                      // setError: form.setError,
                    })}
                  </FormControl>
                </FormItem>
              )}
            />
          </TableCell>
        );
      })}

      <DeleteDialog
        isOpen={dialogHelper.isOpen}
        title={dialogHelper.title}
        description={dialogHelper.description}
        onClose={hideDialog}
        onConfirm={handleDeleteConfirm}
      />
    </TableRow>
  );
}) as <TFormValues extends FieldValues, TName extends ArrayPath<TFormValues>>(
  props: FormsRowProps<TFormValues, TName>,
) => React.ReactElement;

(FormsRow as any).displayName = "FormsRow";

export default FormsRow;
