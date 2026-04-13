import type { Dispatch, SetStateAction } from "react";

export interface ILogingForm {
  mobile: string;
  password: string;
}

export interface ISendMobile {
  mobile: string;
}

export interface IForgotPassword {
  mobile: string;
  otp: string;
  new_password: string;
  confirm_password: string;
}

export interface ISendOTP {
  mobile: string;
  otp: string;
  new_password?: string;
  confirm_password?: string;
}

export interface IOTPResponse {
  type: string;
  mobile: string;
  otp_expire: string;
  new_otp_created: boolean;
  is_used: boolean;
  has_password: boolean;
}

export interface ILoginResponse {
  refresh: string;
  access: string;
}

export type TOtpStep = "mobile" | "otp" | "password";

export interface User {
  id: string;
  username: string;
  mobile: string;
  role: string;
}

export interface LoginResponse {
  user: {
    mobile: string;
    avatar: string | null;
  };
  message: string;
}

export interface LoginTabsProps {
  step: TOtpStep;
  setStep: Dispatch<SetStateAction<TOtpStep>>
}

export type TChangePass = {
  old_password: string;
  new_password: string;
  confirm_password: string;
};
export type TAvatar = {
  avatar: File | null;
};
