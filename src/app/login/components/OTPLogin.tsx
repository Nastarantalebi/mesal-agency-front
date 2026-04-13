import type {
  IForgotPassword,
  ISendMobile,
  ISendOTP,
  TOtpStep,
} from "../types";
import { useCallback, useState } from "react";
import useRequestOTP from "../services/useRequestOTP";
import SendMobileSteps from "./SendMobileSteps";
import SendOTPSteps from "./SendOTPSteps";
import PasswordSteps from "./PasswordSteps";
import { useNavigate } from "@tanstack/react-router";
import useOTPExpire from "../hooks/useOTPExpire";
import useVerifyOTP from "../services/useVerifyOTP";

const OTPLogin = () => {
  const [step, setStep] = useState<TOtpStep>("mobile");
  const [mobile, setMobile] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const navigate = useNavigate();

  const {
    mutateAsync: requestOTP,
    isPending: isRequestingOTP,
    error: requestOTPError,
    reset: resetOTPRequest,
    data: otpResponse,
  } = useRequestOTP();

  const {
    canResend,
    isExpired,
    resetCountdowns,
    formattedResendTime,
    formattedExpireTime,
    startExpireCountdownAt,
    startResendCountdownAt,
  } = useOTPExpire();

  const {
    mutateAsync: verifyOTP,
    isPending: isVerifyingOTP,
    error: verifyOTPError,
  } = useVerifyOTP();

  const handleMobileSubmit = useCallback(
    (data: ISendMobile) => {
      requestOTP(
        { mobile: data.mobile },
        {
          onSuccess: (responseData) => {
            setMobile(responseData.mobile);
            startExpireCountdownAt(responseData.otp_expire);
            startResendCountdownAt(responseData.otp_expire);
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
  const handleChangeMobile = useCallback(() => {
    setStep("mobile");
    setMobile("");
    setOtp("");
    resetCountdowns();
    resetOTPRequest();
  }, [resetCountdowns, resetOTPRequest]);

  const handleOtpSubmit = useCallback(
    (data: ISendOTP) => {
      setOtp(data.otp);
      const hasPassword = otpResponse?.has_password ?? true;
      if (hasPassword) {
        verifyOTP({ mobile: data.mobile, otp: data.otp });
        navigate({ to: "/dashboard" });
      } else {
        setStep("password");
      }
    },
    [verifyOTP, otpResponse],
  );
  const handleResendOtp = useCallback(() => {
    // Prevent resend if countdown is active or mobile is empty
    if (!canResend || !mobile || isRequestingOTP) {
      return;
    }

    requestOTP(
      { mobile },
      {
        onSuccess: (responseData) => {
          startExpireCountdownAt(responseData.otp_expire);
          startResendCountdownAt(responseData.otp_expire);
        },
      },
    );
  }, [
    mobile,
    canResend,
    isRequestingOTP,
    requestOTP,
    startExpireCountdownAt,
    startResendCountdownAt,
  ]);

  if (step === "mobile") {
    return (
      <SendMobileSteps onSubmit={handleMobileSubmit} error={requestOTPError} />
    );
  }

  if (step === "password") {
    return (
      <PasswordSteps
        mobile={mobile}
        otp={otp}
        onSubmit={handlePasswordSubmit}
        onChangeMobile={handleChangeMobile}
        isExpired={isExpired}
        isLoading={isVerifyingOTP}
        error={verifyOTPError}
        expireCountdown={formattedExpireTime}
      />
    );
  }
  return (
    <SendOTPSteps
      mobile={mobile}
      onSubmit={handleOtpSubmit}
      isSendingOTP={isRequestingOTP}
      canResend={canResend}
      isExpired={isExpired}
      resendCountdown={formattedResendTime}
      expireCountdown={formattedExpireTime}
      onResend={handleResendOtp}
      isLoading={isVerifyingOTP}
      error={verifyOTPError}
      onChangeMobile={handleChangeMobile}
    />
  );
};

export default OTPLogin;
