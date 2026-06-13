import { goToElement } from "@/utils/focusUtils";
import {
  createContext,
  useCallback,
  useContext,
  useRef,
  type ReactNode,
} from "react";

type FocusableEntry = {
  el: HTMLElement;
  rowIndex: number;
  fieldIndex: number;
  isActive: () => boolean;
};

// ✅ اضافه شد: ROW_INDEX ثابت برای FormBody که ردیفی نداره
export const FORM_BODY_ROW = -1;

type FocusRegistry = {
  register: (
    rowIndex: number,
    fieldIndex: number,
    el: HTMLElement | null,
    isActive?: () => boolean,
  ) => void;
  focusNext: (rowIndex: number, fieldIndex: number) => boolean;
  focusPrev: (rowIndex: number, fieldIndex: number) => boolean;
  focusAt: (rowIndex: number, fieldIndex?: number) => void;
};

const FocusRegistryContext = createContext<FocusRegistry | null>(null);

export function FocusRegistryProvider({ children }: { children: ReactNode }) {
  const registry = useRef<Map<string, FocusableEntry>>(new Map());

  const register = useCallback(
    (
      rowIndex: number,
      fieldIndex: number,
      el: HTMLElement | null,
      isActive?: () => boolean,
    ) => {
      const key = `${rowIndex}-${fieldIndex}`;
      if (!el) {
        registry.current.delete(key);
        return;
      }
      registry.current.set(key, {
        el,
        rowIndex,
        fieldIndex,
        isActive: isActive ?? (() => true),
      });
    },
    [],
  );

  // ✅ helper مشترک
  const getSortedActiveEntries = useCallback(
    () =>
      Array.from(registry.current.values())
        .filter((e) => e.isActive())
        .sort((a, b) =>
          a.rowIndex !== b.rowIndex
            ? a.rowIndex - b.rowIndex
            : a.fieldIndex - b.fieldIndex,
        ),
    [],
  );

  // ✅ حالا boolean برمی‌گردونه - caller می‌دونه آیا handle شد یا نه
  const focusNext = useCallback(
    (rowIndex: number, fieldIndex: number): boolean => {
      const entries = getSortedActiveEntries();

      const idx = entries.findIndex(
        (e) => e.rowIndex === rowIndex && e.fieldIndex === fieldIndex,
      );
      const next = entries[idx + 1];
      if (!next) return false;
      goToElement(next.el);
      return true;
    },
    [getSortedActiveEntries],
  );

  const focusPrev = useCallback(
    (rowIndex: number, fieldIndex: number): boolean => {
      const entries = getSortedActiveEntries();
      const idx = entries.findIndex(
        (e) => e.rowIndex === rowIndex && e.fieldIndex === fieldIndex,
      );
      const prev = entries[idx - 1];
      if (!prev) return false;
      goToElement(prev.el);
      return true;
    },
    [getSortedActiveEntries],
  );

  const focusAt = useCallback((rowIndex: number, fieldIndex = 0) => {
    const entry = registry.current.get(`${rowIndex}-${fieldIndex}`);
    if (entry) goToElement(entry.el);
  }, []);

  return (
    <FocusRegistryContext.Provider
      value={{ register, focusNext, focusPrev, focusAt }}
    >
      {children}
    </FocusRegistryContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useFocusRegistry(): FocusRegistry {
  const ctx = useContext(FocusRegistryContext);
  if (!ctx)
    throw new Error(
      "useFocusRegistry باید داخل FocusRegistryProvider استفاده بشه",
    );
  return ctx;
}
