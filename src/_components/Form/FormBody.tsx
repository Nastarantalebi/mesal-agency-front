import { useCallback, useEffect, useRef } from "react";
import useFormField from "./useFormField";
import type { Control, FieldErrors, FieldValues } from "react-hook-form";
import type { TFormData } from "@/types";
import FormLabel from "./FormLabel";
import { SeparatorHorizontal } from "lucide-react";
import FormField from "./FormField";
import clsx from "clsx";
import { FORM_BODY_ROW, useFocusRegistry } from "./FocusRegistryContext";
import { useFocusRowStore } from "./tableForm/rowFocusState";
import { FOCUSABLE_SELECTOR, goToElement } from "@/utils/focusUtils";

type TProps<TFormValues extends FieldValues> = {
  formFields?: (TFormData<TFormValues> | undefined)[];
  rowIndex?: number;
  // setError?: UseFormSetError<TFormValues>;
  onLastFieldEnter?: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<TFormValues, any, TFormValues>;
  errors: FieldErrors<TFormValues>;
};

function FormBody<TFormValues extends FieldValues>({
  formFields,
  rowIndex,
  // setError,
  control,
  onLastFieldEnter,
  errors,
}: TProps<TFormValues>) {
  const fieldRenderer = useFormField<TFormValues>();
  const setFocusedRowIndex = useFocusRowStore((f) => f.setFocusRow);

  const inputRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, formFields?.length);
  }, [formFields]);
  const { register, focusNext, focusPrev } = useFocusRegistry();
  const registryRowIndex = rowIndex ?? FORM_BODY_ROW;

  // بالای فایل: یک هِلپر برای تشخیص قابل فوکوس بودن
  const isFocusable = (el: HTMLElement | null) => {
    if (!el) return false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const anyEl = el as any;
    const ariaDisabled = el.getAttribute?.("aria-disabled") === "true";
    const dataReadonly = el.getAttribute?.("data-read-only") === "true";
    const dataDisabled = el.getAttribute?.("data-disabled") === "true";

    // خود کامپوننت‌ها
    const disabled =
      !!anyEl.disabled ||
      !!anyEl.readOnly ||
      ariaDisabled ||
      dataReadonly ||
      dataDisabled;

    // اگر نمایش داده نمی‌شود هم اسکپ
    const rect = el.getBoundingClientRect?.();
    const hidden = !rect || (rect.width === 0 && rect.height === 0);

    return !disabled && !hidden;
  };
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLElement>, fieldIndex: number) => {
      // ─── tab: رفتن به فیلد بعدی ─────────────────────────────
      if (e.key === "tab") {
        const target = e.target as HTMLElement;

        // برای button (RadioGroupItem) اجازه بده navigation انجام بشه
        const isSelectTrigger = target.dataset?.selectTrigger === "true";
        if (isSelectTrigger && e.defaultPrevented) return;

        e.preventDefault();

        setTimeout(() => {
          // 1) از registry بخون
          const handled = focusNext(registryRowIndex, fieldIndex);
          if (handled) return;

          // 2) callback به parent
          onLastFieldEnter?.();

          // 3) fallback: global form navigation
          const active = document.activeElement as HTMLElement | null;
          const formEl = active?.closest("form");
          if (!formEl) return;

          const all = Array.from(
            formEl.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
          );
          const pos = all.indexOf(active!);
          if (pos === -1) return;

          const nextGlobal = all.slice(pos + 1).find(isFocusable);
          const table = all
            .slice(pos + 1)
            .find((e) => e.getAttribute("data-rowindex") === "0");

          if (table) {
            setFocusedRowIndex(0);
          }
          if (nextGlobal) {
            goToElement(nextGlobal);
          }
        }, 10);

        return;
      }

      // ─── Space: فقط برای select/button ─────────────────────────
      if (e.key === " " || e.key === "Spacebar") {
        const target = e.target as HTMLElement;
        if (
          target.dataset?.selectTrigger === "true" ||
          target instanceof HTMLButtonElement
        ) {
          return;
        }
      }

      // ─── Shift+Tab: رفتن به فیلد قبلی ──────────────────────────
      if (e.key === "Tab" && e.shiftKey) {
        e.preventDefault();

        setTimeout(() => {
          // 1) از registry بخون
          const handled = focusPrev(registryRowIndex, fieldIndex);
          if (handled) return;

          // 2) fallback: global form navigation
          const active = document.activeElement as HTMLElement | null;
          const formEl = active?.closest("form");
          if (!formEl) return;

          const all = Array.from(
            formEl.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
          );
          const pos = all.indexOf(active!);
          if (pos <= 0) return;

          const prevGlobal = all.slice(0, pos).reverse().find(isFocusable);
          if (prevGlobal) goToElement(prevGlobal);
        }, 10);
      }
    },
    [
      focusNext,
      registryRowIndex,
      onLastFieldEnter,
      setFocusedRowIndex,
      focusPrev,
    ],
  );
  const handleFieldRef = useCallback(
    (
      fieldIndex: number,
      fieldConfig: TFormData<TFormValues>,
      rhfRef: ((el: unknown) => void) | React.RefObject<unknown> | null,
    ) =>
      (el: HTMLElement | null) => {
        // ثبت در inputRefs
        inputRefs.current[fieldIndex] = el;

        // ثبت در registry
        register(
          registryRowIndex,
          fieldIndex,
          el,
          // ✅ فیلد readOnly در navigation رد می‌شه
          () => !fieldConfig.readOnly && !fieldConfig.disabled,
        );

        // ثبت در RHF
        if (typeof rhfRef === "function") {
          rhfRef(el);
        } else if (rhfRef && "current" in rhfRef) {
          (rhfRef as React.MutableRefObject<unknown>).current = el;
        }

        // ✅ data-attribute برای CSS/query selector
        if (el) {
          if (fieldConfig.disabled) el.dataset.disabled = "true";
          if (fieldConfig.readOnly) el.dataset.readOnly = "true";
        }
      },
    [registryRowIndex, register],
  );

  const handleEnterKey = (
    e: React.KeyboardEvent<HTMLElement>,
    index: number,
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();

      setTimeout(() => {
        // از بعدی شروع کن و اولین فوکوس‌پذیر را پیدا کن
        const nextInput = inputRefs.current
          .slice(index + 1)
          .find((el) => isFocusable(el));

        if (nextInput) {
          // اگر Select تریگر است
          if (nextInput.dataset?.selectTrigger === "true") {
            nextInput.focus();
            setTimeout(() => {
              (nextInput as HTMLButtonElement).click();
            }, 20);
          } else {
            nextInput.focus();
          }
        } else {
          onLastFieldEnter?.();
        }
      }, 10);
    }
  };
  return (
    <>
      {formFields?.map((fieldConfig, index) => {
        if (!fieldConfig) return null;
        const { ...rendererProps } = fieldConfig;
        if (fieldConfig.name === "separator")
          return (
            <div className="col-span-full" key={fieldConfig.name + index}>
              {fieldConfig.label && (
                <FormLabel
                  htmlFor={fieldConfig.name}
                  className="flex flex-col w-full sm:flex-row"
                >
                  {fieldConfig.label}
                </FormLabel>
              )}
              <SeparatorHorizontal className="my-4" />
            </div>
          );

        if (fieldConfig.name === "empty")
          return <div key={fieldConfig.name}></div>;

        const largeField = ["notes", "address", "bio", "description"];
        const ltrFields = ["number", "email", "password", "tel"];

        return (
          <div
            key={fieldConfig.name}
            className={clsx(
              largeField.includes(fieldConfig.name) &&
                "col-span-full md:col-span-3",
              fieldConfig.className,
            )}
          >
            {fieldConfig.label && (
              <FormLabel
                htmlFor={fieldConfig.name}
                className="flex w-full flex-row"
              >
                {fieldConfig.label}
                {fieldConfig.required && (
                  <span className="text-destructive">*</span>
                )}
              </FormLabel>
            )}
            <FormField
              control={control}
              name={fieldConfig.name}
              render={({ field }) => (
                <div
                  dir={
                    fieldConfig.inputType &&
                    ltrFields.includes(fieldConfig.inputType)
                      ? "ltr"
                      : "rtl"
                  }
                >
                  {fieldRenderer({
                    ...rendererProps,
                    field,
                    onKeyDown: (e: React.KeyboardEvent<HTMLElement>) => {
                      handleKeyDown(e, index);
                      handleEnterKey(e, index);
                      fieldConfig.onKeyDown?.(e);
                    },
                    ref: handleFieldRef(index, fieldConfig, field.ref),

                    // field,
                    errors,
                    // rowIndex,
                    // setError,
                  })}
                  {"message" in (errors?.[fieldConfig.name] ?? {}) &&
                    typeof errors?.[fieldConfig.name]?.message === "string" && (
                      <div className="mt-2 text-destructive text-right">
                        {errors[fieldConfig.name]!.message as string}
                      </div>
                    )}
                </div>
              )}
            />
          </div>
        );
      })}
    </>
  );
}

export default FormBody;
