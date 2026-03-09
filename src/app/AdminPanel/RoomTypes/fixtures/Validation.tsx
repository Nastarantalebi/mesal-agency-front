import { z } from "zod";
import type {
  TCreateRoomType,
  TCRoomTypePrices,
  TCRoomTypesRoom,
} from "../types";

export const roomTypeValidation = z.object({
  name: z.string().min(1, "نام نوع اتاق الزامی است"),
  capacity: z.number().nullable(),
  extraPerson: z.number().min(0).nullable(),
  description: z.string().nullable(),
  breakfast: z.boolean().nullable(),
  lunch: z.boolean().nullable(),
  dinner: z.boolean().nullable(),
});

export const roomTypeInitialValues: TCreateRoomType = {
  name: "",
  capacity: 0,
  extraPerson: 0,
  description: "",
  breakfast: false,
  lunch: false,
  dinner: false,
};

export const roomTypeRoomValidation = z.object({
  name: z.string().min(1, "نام اتاق الزامی است"),
  floor: z.number().nullable(),
  description: z.string().nullable(),
});

export const roomTypeRoomsInitialValues: TCRoomTypesRoom = {
  name: "",
  floor: 0,
  description: "",
};
export const roomTypePriceValidation = z.object({
  prices: z.array(
    z.object({
      date: z.string(),
      adult_normal_price: z.number().min(0, "عدد باید مثبت باشد"),
      adult_peak_price: z.number().min(0, "قیمت باید مثبت باشد"),
      child_normal_price: z.number().min(0, "قیمت باید مثبت باشد"),
      child_peak_price: z.number().min(0, "قیمت باید مثبت باشد"),
    }),
  ),
});

export const roomTypePriceInitialValues: TCRoomTypePrices = {
  prices: [],
};
