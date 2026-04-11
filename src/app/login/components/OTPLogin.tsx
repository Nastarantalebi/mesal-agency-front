import type {
  IForgotPassword,
  ISendMobile,
  ISendOTP,
  TOtpStep,
} from "../types";
import {
  useCallback,
  useState,
} from "react";
import useRequestOTP from "../services/useRequestOTP";
import SendMobileSteps from "./SendMobileSteps";
import SendOTPSteps from "./SendOTPSteps";
import PasswordSteps from "./PasswordSteps";
import { verifyOTP } from "../services/authServices";

const OTPLogin = () => {
  const [step, setStep] = useState<TOtpStep>("mobile");
  const [mobile, setMobile] = useState<string>("");
  const [otp, setOtp] = useState<string>("");

  const {
    mutateAsync: requestOTP,
    isPending: isRequestingOTP,
    // error: requestOTPError,
    // reset: resetOTPRequest,
    data: otpResponse,
  } = useRequestOTP();

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
    (data: IForgotPassword) => {
      verifyOTP({
        mobile: data.mobile,
        otp: data.otp,
        new_password: data.new_password,
        confirm_password: data.confirm_password,
      });
    },
    [verifyOTP],
  );

  const handleOtpSubmit = useCallback(
    (data: ISendOTP) => {
      setOtp(data.otp);
      const hasPassword = otpResponse?.has_password ?? true;
      if (hasPassword) {
        verifyOTP({ mobile: data.mobile, otp: data.otp });
        // navigate({to: "/dashboard"});
      } else {
        setStep("password");
      }
    },
    [verifyOTP, otpResponse],
  );

  if (step === "mobile") {
    return <SendMobileSteps onSubmit={handleMobileSubmit} />;
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
  return (
    <SendOTPSteps
      mobile={mobile}
      onSubmit={handleOtpSubmit}
      setStep={setStep}
      sendingOTP={isRequestingOTP}
    />
  );
};

export default OTPLogin;
