import { Request } from "../../../lib/httpService";
import type { IForgotPassword, ILogingForm, ISendMobile, ISendOTP, } from "../types";

const LOGIN_URL = import.meta.env.VITE_BACKEND_Login_URL;

export async function refresh() {
  const { data } = await Request.post(`${LOGIN_URL}/refresh/`);
  return data;
}

export async function requestOTP(values: ISendMobile) {
  const { data } = await Request.post(`${LOGIN_URL}/otp/request/`, values);
  return data;
}
export async function verifyOTP(values: ISendOTP) {
  const { data } = await Request.post(`${LOGIN_URL}/otp/login/`, values);
  return data;
}

export async function passwordLogin(values: ILogingForm) {
  const { data } = await Request.post(`${LOGIN_URL}/login/`, values);
  return data;
}
export async function forgotPassword(values: IForgotPassword) {
    const { data } = await Request.post(`${LOGIN_URL}/forgot-password/`, values);
    return data;
}

export async function login(values: ISendOTP) {
  const { data } = await Request.post(`${LOGIN_URL}/otp/login/`, values);
  return data;
}

export async function logout() {
  const { data } = await Request.post(`${LOGIN_URL}/logout/`, {
    withCredentials: true,
  });
  return data;
}
