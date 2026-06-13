import { addCommas } from "@persian-tools/persian-tools";

export const formatMoney = (num: string | number): string =>
  addCommas(String(num).split(".")[0] ?? 0);
