import {
  useCallback,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import useRequestOTP from "../services/useRequestOTP";
import type {
  IForgotPassword,
  ISendMobile,
  ISendOTP,
  TOtpStep,
} from "../types";
import useForgotPassWord from "../services/useForgetPassword";
import { verifyOTP } from "../services/authServices";
import SendMobileSteps from "./SendMobileSteps";
import SendOTPSteps from "./SendOTPSteps";
import PasswordSteps from "./PasswordSteps";

type Props = {
  setForgetPassword: Dispatch<SetStateAction<boolean>>;
};

const ForgetPassword = ({ setForgetPassword }: Props) => {
  const [step, setStep] = useState<TOtpStep>("mobile");
  const [mobile, setMobile] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const {
    mutateAsync: requestOTP,
    // isPending: isRequestingOTP,
    // error: requestOTPError,
    // reset: resetOTPRequest,
    data: otpResponse,
  } = useRequestOTP();

  const {
    mutateAsync: changePassword,
    // isPending: changing,
    // error: changePasswordError,
  } = useForgotPassWord();

  const handleMobileSubmit = useCallback(
    (data: ISendMobile) => {
      requestOTP(
        { mobile: data.mobile },
        {
          onSuccess: (responseData) => {
            setMobile(responseData.mobile);
            setStep("otp");
          },
        },
      );
    },
    [requestOTP],
  );

  const handlePasswordSubmit = useCallback(
    async (data: IForgotPassword) => {
      //   // Check if OTP is expired
      //   if (isExpired) {
      //     // console.error("OTP has expired");
      //     return;
      //   }
      console.log(data)

      changePassword(
        {
          mobile: data.mobile,
          otp: data.otp,
          new_password: data.new_password || "",
          confirm_password: data.confirm_password || "",
        },
        {
          onSuccess: () => {
            setForgetPassword(false);
          },
        },
      );
    },
    [changePassword, setForgetPassword],
  );

  const handleOtpSubmit = useCallback(
    (data: ISendOTP) => {
      setOtp(data.otp);
      const hasPassword = otpResponse?.has_password ?? true;
      if (hasPassword) {
        setStep("password");
      }
    },
    [verifyOTP, otpResponse],
  );

  if (step === "mobile") {
    return <SendMobileSteps onSubmit={handleMobileSubmit} />;
  }

  if (step === "otp") {
    return (
      <SendOTPSteps
        mobile={mobile}
        onSubmit={handleOtpSubmit}
        setStep={setStep}
      />
    );
  }

  if (step === "password") {
    return (
      <PasswordSteps
        mobile={mobile}
        otp={otp}
        onSubmit={handlePasswordSubmit}
      />
    );
  }

  return <div />;
};

export default ForgetPassword;
