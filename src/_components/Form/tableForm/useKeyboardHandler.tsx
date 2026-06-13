import { useCallback, useRef, type RefObject } from "react";
import {
  FOCUSABLE_SELECTOR,
  goToElement,
  isFocusable,
} from "@/utils/focusUtils";

function useKeyboardHandler(
  rowIndex: number,
  handleAddRow: () => void,
  inputRefs: RefObject<(HTMLElement | null)[]>,
  length: number,
  rowRef: RefObject<HTMLTableRowElement | null>,
  handleRowFocus: (index: number) => void,
  isControlable?: boolean,
) {
  // نقشه‌ی «اندیس مقصد → اندیس مبدأ» برای پرش‌ها
  const jumpHistoryRef = useRef<Record<number, number>>({});

  const focusNextField = useCallback(() =>
    // fieldIndex: number,
    // fieldConfig: TFormData<TFormValues>,
    // value?: number | string,
    {
      // const refs = inputRefs.current ?? [];

      // اندیس شروع برای فیلد بعدی (با لحاظ jump/skip)
      // const startIndex =
      //   fieldConfig?.shouldSkip && fieldConfig.jumpTo?.(value) !== undefined
      //     ? (fieldConfig.jumpTo?.(value) as number)
      //     : fieldConfig?.skipFields
      //       ? fieldConfig.skipFields + 1
      //       : fieldIndex + 1;

      // پیدا کردن اندیس واقعی فیلد بعدیِ focusable
      // let nextIndex = -1;
      // for (let i = startIndex; i < refs.length; i++) {
      //   if (isFocusable(refs[i])) {
      //     nextIndex = i;
      //     break;
      //   }
      // }

      // if (nextIndex !== -1) {
      //   // اگر پرش اتفاق افتاده، مبدأ رو ذخیره کن تا shift+tab همون مسیر برگرده
      //   const isJump = startIndex !== fieldIndex + 1;
      //   if (isJump) {
      //     jumpHistoryRef.current[nextIndex] = fieldIndex;
      //   } else {
      //     // مسیر عادی؛ تاریخچه‌ی این مقصد رو پاک کن
      //     delete jumpHistoryRef.current[nextIndex];
      //   }

      //   goToElement(refs[nextIndex]!);
      //   return;
      // }

      // Move to next row or add new
      if (rowIndex < length - 1) {
        handleRowFocus(rowIndex + 1);
        return;
      }

      if (isControlable) handleAddRow();
    }, [
    inputRefs,
    rowIndex,
    length,
    isControlable,
    handleAddRow,
    handleRowFocus,
  ]);

  const handleFieldKeyDown = useCallback(
    (
      e: React.KeyboardEvent<HTMLElement>,
      fieldIndex: number,
      // fieldConfig: TFormData<TFormValues>,
      // value?: number | string,
    ) => {
      const { key, ctrlKey, metaKey, shiftKey, target } = e;

      // Ctrl+Enter رو ignore می‌کنه
      if ((ctrlKey || metaKey) && key === "Enter") return;

      if (key === "Enter") {
        const el = target as HTMLElement;
        const isSelectOrButton =
          el.dataset?.selectTrigger === "true" ||
          el instanceof HTMLButtonElement;

        if (isSelectOrButton && e.defaultPrevented) return;

        e.preventDefault();

        // if (fieldConfig.customEnter) {
        //   const didHandle = fieldConfig.customEnter({
        //     rowIndex,
        //     index: fieldIndex,
        //     focusPrevious: () => inputRefs.current?.[fieldIndex - 1]?.focus(),
        //   });
        //   if (didHandle) return;
        // }

        setTimeout(() => focusNextField(), 10);
        return;
      }

      if (key === "Tab" && shiftKey) {
        e.preventDefault();

        setTimeout(() => {
          // اگر با پرش به این فیلد رسیده بودیم، همون مسیر رو برگرد
          const jumpSource = jumpHistoryRef.current[fieldIndex];
          if (jumpSource !== undefined) {
            const sourceEl = inputRefs.current?.[jumpSource];
            if (sourceEl && isFocusable(sourceEl)) {
              goToElement(sourceEl);
              return;
            }
          }

          const prevLocal = inputRefs.current
            ?.slice(0, fieldIndex)
            .reverse()
            .find(isFocusable);

          if (prevLocal) {
            goToElement(prevLocal);
            return;
          }

          // fallback به کل فرم
          const form = rowRef.current?.closest("form");
          if (!form) return;

          const all = Array.from(
            form.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
          );
          const pos = all.indexOf(document.activeElement as HTMLElement);
          if (pos <= 0) return;

          const prevGlobal = all.slice(0, pos).reverse().find(isFocusable);
          if (prevGlobal) goToElement(prevGlobal);
        }, 10);
        return;
      }

      if (key === "Tab") {
        const el = target as HTMLElement;
        const isSelectOrButton =
          el.dataset?.selectTrigger === "true" ||
          el instanceof HTMLButtonElement;

        if (isSelectOrButton && e.defaultPrevented) return;

        e.preventDefault();

        // if (fieldConfig.customEnter) {
        //   const didHandle = fieldConfig.customEnter({
        //     rowIndex,
        //     index: fieldIndex,
        //     focusPrevious: () => inputRefs.current?.[fieldIndex - 1]?.focus(),
        //   });
        //   if (didHandle) return;
        // }

        // ✅ value رو پاس بده تا jumpTo کار کنه و تاریخچه ثبت بشه
        setTimeout(() => focusNextField(), 10);
        return;
      }
    },
    [rowIndex, inputRefs, focusNextField, rowRef],
  );

  return { handleFieldKeyDown, focusNextField };
}

export default useKeyboardHandler;
