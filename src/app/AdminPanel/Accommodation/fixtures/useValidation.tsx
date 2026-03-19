import z from "zod"
import type { TCreateAccomodation } from "../types";
import { useAddDefaults } from "../../settings/services/useSetting";

const useValidation = () => {

  const { getDefaults } = useAddDefaults();

 const accommodationValidation = z.object({
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
    top: z.boolean(),
    total_rooms: z.number().nullable(),
    has_reception_24h: z.boolean(),
    has_elevator: z.boolean(),
    check_in_time: z.string().nullable(),
    check_out_time: z.string().nullable(),
    built_with_local_materials: z.boolean(),
    allows_local_food_experience: z.boolean(),
    open_start: z.string().min(1, "انتخاب تاریخ شروع قرار داد الزامی است"),
    open_end: z.string().min(1, "انتخاب تاریخ پایان قرارداد الزامی است"),
    min_child_age: z.number().min(0, "سن کودک حداقل میتواند ۱ باشد"),
    max_child_age: z.number().max(20, "سن کودک حداکثر میتواند 20 باشد"),
    is_active: z.boolean(),
  });
  
 const accommodationInitialValues: TCreateAccomodation = {
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
    top: false,
    total_rooms: 0,
    has_reception_24h: false,
    has_elevator: false,
    check_in_time: getDefaults.data?.check_in_time || null,
    check_out_time: getDefaults.data?.check_out_time || null,
    built_with_local_materials: false,
    allows_local_food_experience: false,
    open_start: "",
    open_end: "",
    min_child_age: getDefaults.data?.min_child_age || 0,
    max_child_age: getDefaults.data?.max_child_age || 0,
    is_active: false,
  };

  return {accommodationValidation, accommodationInitialValues}

}

export default useValidation



