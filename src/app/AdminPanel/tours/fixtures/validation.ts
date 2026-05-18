import z, { string } from "zod";

export const  additionaTourInfoValidation = z.object({
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
        price: z.string().min(0, "قیمت نمی‌تواند منفی باشد"),
        original_price: z.string().min(0).optional().nullable(),
        max_participants: z
          .number()
          .int()
          .min(1, "حداکثر شرکت‌کننده باید حداقل ۱ باشد"),
        min_participants: z.number().int().min(1).optional(),
        available_seats: z.number().int().min(1, "ظرفیت باقی مانده باید بیشتر از ۱ باشد."),
        meeting_point: z.string(),
        status: z.string().optional().nullable(),
        is_featured: z.boolean()
})

export type TCreateTourDeparture = z.infer<typeof additionaTourInfoValidation>;
export type TResponseTourDeparture = TCreateTourDeparture & {id: number}

export const additionalTourInfoInitialValues: TCreateTourDeparture = {
    start: "",
    end: "",
    duration_days: 1,
    duration_nights: 0,
    price: "",
    original_price: null,
    max_participants: 1,
    min_participants: 1,
    available_seats: 1,
    meeting_point: "",
    status: null,
    is_featured: false,
}
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

