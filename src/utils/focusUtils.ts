// ✅ یک بار تعریف می‌شه، همه جا import می‌کنن
export const FOCUSABLE_SELECTOR = `
  input:not([disabled]):not([type="hidden"]):not([type="checkbox"]),
  select:not([disabled]),
  textarea:not([disabled]),
  [tabindex]:not([tabindex="-1"]),
  [data-select-trigger="true"],
  [data-treeselect-trigger="true"]
` as const;

export function isFocusable(el: HTMLElement | null): boolean {
  if (!el) return false;

  const disabled =
    (el as HTMLInputElement).disabled ||
    (el as HTMLInputElement).readOnly ||
    el.getAttribute("aria-disabled") === "true" ||
    el.getAttribute("data-read-only") === "true" ||
    el.getAttribute("data-disabled") === "true";

  if (disabled) return false;

  const rect = el.getBoundingClientRect();
  return rect.width > 0 || rect.height > 0;
}

export function goToElement(el: HTMLElement | null): void {
  if (!el) return;
  el.focus();
  if (el.dataset?.selectTrigger === "true") {
    setTimeout(() => (el as HTMLButtonElement).click(), 20);
  }
}
