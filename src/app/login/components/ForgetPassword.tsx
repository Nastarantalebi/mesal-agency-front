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
import SendMobileSteps from "./SendMobileSteps";
import SendOTPSteps from "./SendOTPSteps";
import PasswordSteps from "./PasswordSteps";
import useOTPExpire from "../hooks/useOTPExpire";

type Props = {
  setForgetPassword: Dispatch<SetStateAction<boolean>>;
};

const ForgetPassword = ({ setForgetPassword }: Props) => {
  const [step, setStep] = useState<TOtpStep>("mobile");
  const [mobile, setMobile] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const {
    mutateAsync: requestOTP,
    isPending: isRequestingOTP,
    error: requestOTPError,
    reset: resetOTPRequest,
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
    mutateAsync: changePassword,
    isPending: changing,
    error: changePasswordError,
  } = useForgotPassWord();

  const handleMobileSubmit = useCallback(
    (data: ISendMobile) => {
      requestOTP(
        { mobile: data.mobile },
        {
          onSuccess: (responseData) => {
            setMobile(responseData.mobile);
            setStep("otp");

            startExpireCountdownAt(responseData.otp_expire);
            startResendCountdownAt(responseData.otp_expire);
          },
        },
      );
    },
    [requestOTP, startResendCountdownAt, startExpireCountdownAt],
  );

  const handlePasswordSubmit = useCallback(
    async (data: IForgotPassword) => {
      // Check if OTP is expired
      if (isExpired) {
        return;
      }

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
    [changePassword, isExpired, setForgetPassword],
  );

  const handleOtpSubmit = useCallback(
    async (data: ISendOTP) => {
      // Check if OTP is expired
      if (isExpired) {
        return;
      }

      setOtp(data.otp);
      setStep("password");
    },
    [isExpired],
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
    startResendCountdownAt,
    startExpireCountdownAt,
  ]);

  const handleChangeMobile = useCallback(() => {
    setStep("mobile");
    setMobile("");
    setOtp("");
    resetCountdowns();
    resetOTPRequest();
  }, [resetCountdowns, resetOTPRequest]);

  if (step === "mobile") {
    return (
      <SendMobileSteps onSubmit={handleMobileSubmit} error={requestOTPError} />
    );
  }

  if (step === "otp") {
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
        isLoading={changing}
        error={changePasswordError}
        onChangeMobile={handleChangeMobile}
      />
    );
  }

  if (step === "password") {
    return (
      <PasswordSteps
        mobile={mobile}
        otp={otp}
        onSubmit={handlePasswordSubmit}
        onChangeMobile={handleChangeMobile}
        isLoading={changing}
        isExpired={isExpired}
        error={changePasswordError}
        expireCountdown={formattedExpireTime}
      />
    );
  }

  return <div />;
};

export default ForgetPassword;
