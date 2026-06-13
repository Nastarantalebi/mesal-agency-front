import { useEffect } from "react";
import type { RefObject } from "react";
import type { DatePickerRef } from "react-multi-date-picker";

export function useOutsideClick(
  wrapperRef: RefObject<HTMLElement | null>,
  datePickerRef: RefObject<DatePickerRef | null>
) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      // اگر روی پاپ‌آپ تایم‌پیکر کلیک شد → نبند
      if (target.closest(".rmdp-container")) return;

      // input داخل wrapper هم دیگه اجازه ندیم (میخوایم وقتی روی فیلد دیگه کلیک شد بسته بشه)
      // بنابراین این خط را حذف یا تغییر بده
      // if (wrapperRef.current?.contains(target)) return;

      // در همه‌ی موارد دیگر → بسته شود
      datePickerRef.current?.closeCalendar();
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef, datePickerRef]);
}
