import { z } from "zod";
import type { TCreateRoomType } from "../types";

export const roomTypeValidation = z.object({
  name: z.string().min(1, "نام اتاق الزامی است"),
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