import type { Items } from "@/components/form/FormInputTypes";
import type { IForgotPassword, ILogingForm, ISendMobile } from "../types";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const useLoginFields = () => {
    const [showPass, setShowPass] = useState(false)
  const LoginMobileFields: Items<ISendMobile>[] = [
    {
      name: "mobile",
      label: "شماره همراه",
      isRequired: false,
      fieldType: "input",
      inputType: "tel",
      direction: "ltr",
      maxLength: 11,
    },
  ];

  const LoginPassWordFields: Items<ILogingForm>[] = [
    {
      name: "mobile",
      label: "شماره همراه",
      isRequired: false,
      fieldType: "input",
      inputType: "tel",
      direction: "ltr",
      maxLength: 11,
    },
    {
      name: "password",
      label: "رمز عبور",
      isRequired: false,
      fieldType: "input",
      inputType: showPass ? "text": "password",
      direction: "ltr",
      icon: <button type="button" onClick={() => setShowPass(!showPass)}>{showPass ? <EyeOff/> : <Eye/>}</button>,
    },
  ];

  const LoginNewPasswordFields: Items<IForgotPassword>[] = [
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
  ];
  return { LoginMobileFields, LoginPassWordFields, LoginNewPasswordFields };
};

export default useLoginFields;
