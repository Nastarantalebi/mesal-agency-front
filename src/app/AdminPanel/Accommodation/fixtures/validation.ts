import z from "zod"
import type { TCreateAccomodation } from "../types";



export const accommodationValidation = z.object({
  type: z.string().min(1, "نوع اقامتگاه الزامی است"),
  name: z.string().min(1, "نام اقامتگاه الزامی است"),
  description: z.string().nullable(),
  address: z.string().nullable(),
  city: z.string().nullable(),
  manufacture_date: z.string().nullable(),
  latitude: z.string().nullable(),
  longitude: z.string().nullable(),
  max_guests: z.number().min(0, "تعداد مهمانان نمیتواند منفی باشد").nullable(),
  floors: z.number().min(0, "تعداد طبقات منفی نمیتواند باشد").nullable(),
  area_sqm: z.number().max(32767, "این عدد باید کم تر از 32767 باشد").nullable(),
  stars: z.number().min(1, "تعداد ستاره ها حداقل 1 است").max(5, "تعداد ستاره ها حداکثر ۵ است").nullable(),
  total_rooms: z.number().nullable(),
  has_reception_24h: z.boolean(),
  has_elevator: z.boolean(),
  check_in_time: z.string().nullable(),
  check_out_time: z.string().nullable(),
  built_with_local_materials: z.boolean(),
  allows_local_food_experience: z.boolean(),
  is_active: z.boolean(),
});

export const accommodationInitialValues: TCreateAccomodation = {
  type: "",
  name: "",
  description: "",
  address: "",
  city: null,
  manufacture_date: null,
  latitude: null,
  longitude: null,
  max_guests: 0,
  floors: 0,
  area_sqm: 0,
  stars: 1,
  total_rooms: 0,
  has_reception_24h: false,
  has_elevator: false,
  check_in_time: null,
  check_out_time: null,
  built_with_local_materials: false,
  allows_local_food_experience: false,
  is_active: false,
};


// export type TCreateAccomodation = z.infer<typeof accommodationValidation>;


