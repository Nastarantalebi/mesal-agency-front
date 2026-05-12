import { z } from "zod";

export const tourValidation = z
  .object({
    // required
    title: z.string().min(3, "عنوان تور باید حداقل ۳ کاراکتر باشد"),

    // optional
    slug: z.string().optional(),

    // required
    category: z.enum(["incountry", "foreign"], {
      message: "دسته‌بندی تور نامعتبر است",
    }),

    // required
    description: z.string().min(10, "توضیحات تور باید حداقل ۱۰ کاراکتر باشد"),

    // required
    short_description: z
      .string()
      .min(5, "توضیح کوتاه باید حداقل ۵ کاراکتر باشد")
      .max(300, "توضیح کوتاه نباید بیشتر از ۳۰۰ کاراکتر باشد"),

    // optional nullable
    vehicle_type: z
      .enum(["bus", "minibus", "van", "train", "flight", "walking", "car", "boat", "bicycle", "mixed"])
      .nullable()
      .optional(),

    // optional
    vehicle_details: z.string().optional().nullable(),

    transportation_included: z.boolean().optional().nullable(),

    // required
    featured_image: z.file().nullable(),

    // required
    price: z.number().min(0, "قیمت نمی‌تواند منفی باشد"),

    // optional
    original_price: z.number().min(0).optional().nullable(),

    // required
    duration_days: z
      .number()
      .int("تعداد روزها باید عدد صحیح باشد")
      .min(1, "تعداد روزها باید حداقل ۱ باشد"),

    // required
    duration_nights: z
      .number()
      .int("تعداد شب‌ها باید عدد صحیح باشد")
      .min(0, "تعداد شب‌ها نمی‌تواند منفی باشد"),

    // required
    start: z.string().min(1, "فیلد الزامی است."),

    // required
    end: z.string().min(1, "فیلد الزامی است."),

    // required
    destination: z.string().min(1, "این فیلد الزامی است."),

    // optional
    country: z.string().optional().nullable(),

    // required
    meeting_point: z.string().min(3, "محل ملاقات الزامی است"),

    // meeting_point_latitude: z
    //   .number()
    //   .min(-90)
    //   .max(90)
    //   .optional().nullable(),

    // meeting_point_longitude: z
    //   .number()
    //   .min(-180)
    //   .max(180)
    //   .optional().nullable(),

    // required
    max_participants: z
      .number()
      .int()
      .min(1, "حداکثر شرکت‌کننده باید حداقل ۱ باشد"),

    // optional
    min_participants: z.number().int().min(1).optional(),

    // required
    difficulty: z.enum(["easy", "moderate", "challenging", "difficult"], {
      message: "درجه سختی تور نامعتبر است",
    }),

    age_requirement: z.number().int().min(0),

    included: z.string().optional(),
    excluded: z.string().optional(),
    highlights: z.string().optional(),

    status: z.enum(["draft", "active", "archived"]).optional().nullable(),

    is_featured: z.boolean().optional().nullable(),

    // meta_title: z.string().max(255).optional(),
    // meta_description: z.string().max(500).optional(),

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
  slug: "", 
  category: "incountry",
  description: "",
  short_description: "",

  vehicle_type: null, 
  vehicle_details: null,
  transportation_included: false,

  featured_image: null,

  price: 0,
  original_price: null,

  duration_days: 1,
  duration_nights: 1,

  start: "", 
  end: "",

  destination: "",
  country: null,

  meeting_point: "",
  // meeting_point_latitude: null,
  // meeting_point_longitude: null,

  max_participants: 1,
  min_participants: 1,

  difficulty: "easy",

  age_requirement: 0,

  included: "",
  excluded: "",
  highlights: "",

  status: "draft",
  is_featured: false,

  // meta_title: "",
  // meta_description: "",

  average_rating: 0,
  total_reviews: 0,
};

