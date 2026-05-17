import { z } from "zod";


export const tourValidation = z
  .object({
    title: z.string().min(3, "عنوان تور باید حداقل ۳ کاراکتر باشد"),
    category: z.string(),
    description: z.string().min(10, "توضیحات تور باید حداقل ۱۰ کاراکتر باشد"),
    short_description: z
      .string()
      .min(5, "توضیح کوتاه باید حداقل ۵ کاراکتر باشد")
      .max(300, "توضیح کوتاه نباید بیشتر از ۳۰۰ کاراکتر باشد"),
    vehicle_type: z.string().optional().nullable(),
    vehicle_details: z.string().optional().nullable(),
    transportation_included: z.boolean().optional().nullable(),
    destination: z.string().min(1, "این فیلد الزامی است."),
    country: z.string().optional().nullable(),
    difficulty: z.string().optional().nullable(),
    age_requirement: z.number().int().min(0),
    highlights: z.string().optional(),
    is_featured: z.boolean().optional().nullable(),
    meta_title: z.string().max(255).optional(),
    meta_description: z.string().max(500).optional(),
    average_rating: z.number().min(0).max(5).optional(),
    total_reviews: z.number().int().min(0).optional(),
   
  })
  // .refine((data) => new Date(data.end) > new Date(data.start), {
  //   message: "تاریخ پایان باید بعد از تاریخ شروع باشد",
  //   path: ["end"],
  // })
  // .refine(
  //   (data) =>
  //     !data.min_participants ||
  //     data.max_participants >= data.min_participants,
  //   {
  //     message:
  //       "حداکثر شرکت‌کنندگان باید بیشتر یا مساوی حداقل شرکت‌کنندگان باشد",
  //     path: ["max_participants"],
  //   }
  // );

export type TCreateTour = z.infer<typeof tourValidation>;

export const tourInitialValues: TCreateTour = {
  title: "",
  category: "",
  description: "",
  short_description: "",
  vehicle_type: null, 
  vehicle_details: null,
  transportation_included: false,
  destination: "",
  country: null,
  difficulty: "easy",
  age_requirement: 0,
  highlights: "",
  is_featured: false,
  meta_title: "",
  meta_description: "",
  average_rating: 0,
  total_reviews: 0,
  
  //---------------------------------------
  // featured_image: null,
  // price: 0,
  // original_price: null,
  // duration_days: 1,
  // duration_nights: 1,
  // start: "", 
  // end: "",
  // meeting_point: "",
  // meeting_point_latitude: null,
  // meeting_point_longitude: null,
  // max_participants: 1,
  // min_participants: 1,
  // included: "",
  // excluded: "",
  // status: "draft",
};


