import z from "zod";
import type { ILogingForm, ISendMobile } from "../types";

export const mobileSchema = z.string().regex(/^09\d{9}$/, "شماره موبایل معتبر نیست").length(11, "شماره موبایل باید ۱۱ رقم باشد")
export const passwordSchema = z
      .string()
      .min(8, "رمز عبور باید حداقل 8 کاراکتر باشد")
      .regex(/[A-Z]/, "رمز عبور باید شامل حداقل یک حرف بزرگ باشد")
      .regex(/[a-z]/, "رمز عبور باید شامل حداقل یک حرف کوچک باشد")
      .regex(/[0-9]/, "رمز عبور باید شامل حداقل یک عدد باشد")

export const mobileInitialValue : ISendMobile = {
    mobile : "",
}

export const loginvalidation = z.object({
    mobile: mobileSchema,
    password: z.string(),
})

export const loginInitialValue : ILogingForm = {
    mobile: "",
    password: "",
}

export const otpValidation = z.object({
  mobile: mobileSchema,
  otp: z.string().length(6, "کد تأیید باید 6 رقم باشد"),
});

export const passwordValidation = z
  .object({
    mobile: mobileSchema,
    otp: z.string(),
    new_password: passwordSchema,
    confirm_password: z.string(),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "رمز عبور و تکرار آن یکسان نیستند",
    path: ["confirm_password"],
  });