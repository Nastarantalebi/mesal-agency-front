import z from "zod";
import type { TCreateDefaults } from "../types";

export const DefaultsValidation = z.object({
    min_child_age: z.number().min(0, "سن نمیتواند کم تر از ۰ باشد"),
    max_child_age: z.number().max(20, "ماکزیمم سن کودک ۲۰ سال است"),
    check_in_time: z.string(),
    check_out_time: z.string(),
});

export const FeaturesInitialValues: TCreateDefaults = {
  min_child_age: 0,
  max_child_age: 0,
  check_in_time: "",
  check_out_time: "",
};

