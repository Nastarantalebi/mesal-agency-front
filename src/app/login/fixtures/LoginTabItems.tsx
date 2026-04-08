import OTPLogin from "../components/OTPLogin";
import PasswordLogin from "../components/PasswordLogin";

export const loginTabItems = [
  { title: "ورود با کد یکبار مصرف", component: <OTPLogin /> },
  { title: "ورود با رمز عبور", component: <PasswordLogin /> },
];
