// utils/dateConverter.ts
import { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import gregorian from "react-date-object/calendars/gregorian";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian_en from "react-date-object/locales/gregorian_en";


export const shamsiToMiladi = (shamsiDate: string): string => {
    
  if (!shamsiDate) return "";

  try {
    const miladiDate = new DateObject({
      date: shamsiDate,
      calendar: persian,
      locale: persian_fa,
    })
      .convert(gregorian, gregorian_en)
      .format("YYYY-MM-DD");

    return miladiDate;
  } catch (error) {
    console.error("Error converting Shamsi to Miladi:", error);
    return "";
  }
};



export const miladiToShamsi = (miladiDate: string): string => {
  if (!miladiDate) return "";

  try {
    const shamsiDate = new DateObject({
      date: miladiDate,
      calendar: gregorian,
      locale: gregorian_en,
    })
      .convert(persian, persian_fa)
      .format("YYYY/MM/DD");

    return shamsiDate;
  } catch (error) {
    console.error("Error converting Miladi to Shamsi:", error);
    return "";
  }
};