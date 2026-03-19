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
      normal_price: z.number().min(0, "عدد باید مثبت باشد"),
      normal_child_price: z.number().min(0, "قیمت باید مثبت باشد"),
      peak_price: z.number().min(0, "قیمت باید مثبت باشد"),
      peak_child_price: z.number().min(0, "قیمت باید مثبت باشد"),
      phone_call_price: z.boolean()

    }),
  ),
});

export const roomTypePriceInitialValues: TCRoomTypePrices = {
  prices: [],
};

export const roomTypeFeatureListValidation = z.object({
  feature: z.array(z.number()).min(1, "لطفاً حداقل یک ویژگی را انتخاب کنید"),
});

export const roomTypeFeatureListInitialValues = {
  feature: [],
};

export const bedListValidation = z.object({
  beds: z.array(
    z.object({
      bed: z.number(),
      number: z.number().min(1),
    })
  ),
});

export const badListInitialValues = {
  beds: [],
};

export type TBedListForm = z.infer<typeof bedListValidation>;
