import z from "zod"
import type { createUsersList, TCFeature, TCreateBed, TCreateDefaults } from "../types"


export const bedValidation = z.object({
    name: z.string().min(1, "نام تخت الزامی است")
})

export const bedInitialValues: TCreateBed = {
    name: "",
}

////////////////////////////////////////////////////////

export const FeaturesValidation = z.object({
  title: z.string().min(1, "نام ویژگی الزامی است"),
  type: z.string().min(1, "نوع الزامی است"),
  show_in_home_page: z.boolean()
});

export const FeaturesInitialValues: TCFeature = {
  title: "",
  type: "",
  show_in_home_page: false,
};

/////////////////////////////////////////////////////////////

export const DefaultsValidation = z.object({
    min_child_age: z.number().min(0, "سن نمیتواند کم تر از ۰ باشد"),
    max_child_age: z.number().max(20, "ماکزیمم سن کودک ۲۰ سال است"),
    check_in_time: z.string(),
    check_out_time: z.string(),
});

export const DefaultsInitialValues: TCreateDefaults = {
  min_child_age: 0,
  max_child_age: 0,
  check_in_time: "",
  check_out_time: "",
};

///////////////////////////////////////////////////////////////

export const usersFilterValidation = z.object({
  mobile: z.string(),
  is_staff: z.string(),
})

export const usersFilterInitialValues: createUsersList = {
  mobile: "",
  is_staff: "",
}