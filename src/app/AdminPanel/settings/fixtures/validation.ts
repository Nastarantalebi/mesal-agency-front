import z from "zod"
import type { createUsersList, TCFeature, TCreateBed, TCreateDefaults } from "../components/toursTemplate/types"


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
};

//////////////////////////////////////////////////////////////

export const newsValidation = z.object({
  title: z.string().min(1, "عنوان الزامی است."),
  type: z.enum(["news", "announcement"]).nullable(),
  priority: z.enum(["normal", "high", "urgent"]).nullable(),
  description: z.string(),
  short_description: z.string(),
  image: z.file().nullable(),
  status: z.enum(["draft", "active", "archived"]).nullable(),
  published_date: z.string().min(1, "انتخاب تاریخ انتشار الزامی است.")
})

export type TNews = z.infer<typeof newsValidation>

export const newsInitialValues : TNews = {
  title: "",
  type: null,
  priority: null,
  description: "",
  short_description:"", 
  image:null, status:null, 
  published_date:""
};