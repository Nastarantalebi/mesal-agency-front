import type { Items } from "@/components/form/FormInputTypes";
import type { IForgotPassword, ILogingForm, ISendMobile } from "../types";

export const LoginMobileFields: Items<ISendMobile>[] = [
  {
    name: "mobile",
    label: "شماره همراه",
    isRequired: false,
    fieldType: "input",
    inputType: "text",
  },
];

export const LoginPassWordFields: Items<ILogingForm>[] = [
  {
    name: "mobile",
    label: "شماره همراه",
    isRequired: false,
    fieldType: "input",
    inputType: "text",
  },
  {
    name: "password",
    label: "رمز عبور",
    isRequired: false,
    fieldType: "input",
    inputType: "text",
  },
];

export const LoginNewPasswordFields : Items<IForgotPassword>[] = [
    {
    name: "new_password",
    label: "رمز عبور",
    isRequired: false,
    fieldType: "input",
    inputType: "text",
  },
    {
    name: "confirm_password",
    label: "تکرار رمز عبور",
    isRequired: false,
    fieldType: "input",
    inputType: "text",
  },
]
