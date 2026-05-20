import z from "zod";

export const tourTemplateValidation = z
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

export type TCreateTourTemplate = z.infer<typeof tourTemplateValidation>;

export const tourTemplateInitialValues: TCreateTourTemplate = {
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
  
};

//--------------------------------------------------------

export const  tourDepartureValidation = z.object({
    start: z.string().min(1, "فیلد الزامی است."),
    end: z.string().min(1, "فیلد الزامی است."),
    duration_days: z
      .number()
      .int("تعداد روزها باید عدد صحیح باشد")
      .min(1, "تعداد روزها باید حداقل ۱ باشد"),
      duration_nights: z
        .number()
        .int("تعداد شب‌ها باید عدد صحیح باشد")
        .min(0, "تعداد شب‌ها نمی‌تواند منفی باشد"),
        price: z.number().min(0, "قیمت نمی‌تواند منفی باشد"),
        original_price: z.number().min(0).optional().nullable(),
        max_participants: z
          .number()
          .int()
          .min(1, "حداکثر شرکت‌کننده باید حداقل ۱ باشد"),
        min_participants: z.number().int().min(1).optional(),
        available_seats: z.number().int().min(1, "ظرفیت باقی مانده باید بیشتر از ۱ باشد."),
        meeting_point: z.string().min(1, "این فیلد نمیتواند خالی باشد."),
        status: z.string().optional().nullable(),
        is_featured: z.boolean()
})

export type TCreateTourDeparture = z.infer<typeof tourDepartureValidation>;
export type TResponseTourDeparture = TCreateTourDeparture & {id: number}

export const tourDepartureInitialValues: TCreateTourDeparture = {
    start: "",
    end: "",
    duration_days: 1,
    duration_nights: 0,
    price: 0,
    original_price: null,
    max_participants: 1,
    min_participants: 1,
    available_seats: 1,
    meeting_point: "",
    status: "active",
    is_featured: false,
}

//---------------------------------------------------------------

export const departurePlansValidation = z.object({
  plans: z.array(
    z.object({
      date: z.string(),
      breakfast: z.boolean(),
      dinner: z.boolean(),
      lunch: z.boolean(),
      description: z.string().min(1, "فیلد توضیحات نمیتواند خالی باشد."),
    })
  ),
});


export type TCreateDeparturePlan = z.infer<typeof departurePlansValidation>;

export type TsendDeparturePlan = {
        date: string,
      breakfast: boolean,
      dinner: boolean,
      lunch: boolean,
      description: string,
}

export type TtourPlanResponse = {
  id: number,
        date: string,
      breakfast: boolean,
      dinner: boolean,
      lunch: boolean,
      description: string,
}

//--------------------------------------
export const departurePlanValidation = z.object({
      date: z.string(),
      breakfast: z.boolean(),
      dinner: z.boolean(),
      lunch: z.boolean(),
      description: z.string().min(1, "فیلد توضیحات نمیتواند خالی باشد."),
    })

export const departurePlanInitialValues : TsendDeparturePlan = {
  date: "",
  breakfast: false,
  dinner: false,
  lunch: false,
  description: "",
}





