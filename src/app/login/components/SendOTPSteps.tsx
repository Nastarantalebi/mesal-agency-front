import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useForm } from "react-hook-form";
import { otpValidation } from "../fixtures/validation";
import type { ISendOTP } from "../types";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomButton from "@/components/form/CustomButton";
import { ArrowLeft, Loader2, Phone, RefreshCw } from "lucide-react";
import { useCallback, useEffect, useRef } from "react";

const OTP_CONFIG = {
  CODE_LENGTH: 6,
} as const;

interface otpProps {
  mobile: string;
  onSubmit: (data: ISendOTP) => void;
  isSendingOTP: boolean;
  canResend: boolean;
  isExpired: boolean;
  resendCountdown: string;
  expireCountdown: string;
  onResend: () => void;
  isLoading: boolean;
  error?: any;
  onChangeMobile: () => void;
}

const SendOTPSteps = ({
  mobile,
  onSubmit,
  isSendingOTP,
  canResend,
  isExpired,
  resendCountdown,
  isLoading,
  onResend,
  error,
  onChangeMobile,
}: otpProps) => {
  const form = useForm<ISendOTP>({
    resolver: zodResolver(otpValidation),
    defaultValues: { mobile, otp: "" },
  });
  const hasAutoSubmittedRef = useRef(false);

  const allowedKeysRegex = /[0-9۰-۹]/;
  const isControlKey = [
    "Backspace",
    "Delete",
    "ArrowLeft",
    "ArrowRight",
    "Tab",
    "Enter",
  ];

  // Auto-submit when OTP is complete

  const otpValue = form.watch("otp");

  const handleAutoSubmit = useCallback(() => {
    // Prevent auto-submit if already submitted, loading, or expired
    if (hasAutoSubmittedRef.current || isLoading || isExpired) {
      return;
    }

    hasAutoSubmittedRef.current = true;
    form.handleSubmit(onSubmit)();
  }, [form, onSubmit, isLoading, isExpired]);

  useEffect(() => {
    if (otpValue?.length === OTP_CONFIG.CODE_LENGTH) {
      handleAutoSubmit();
    } else {
      // Reset auto-submit flag when user edits OTP
      hasAutoSubmittedRef.current = false;
    }
  }, [otpValue, handleAutoSubmit]);

  //reset form when otp expires

  useEffect(() => {
    if (isExpired) {
      // Optionally clear the OTP input when expired
      form.setValue("otp", "");
      hasAutoSubmittedRef.current = false;
    }
  }, [isExpired, form]);

  return (
    <>
      {/* mobile display*/}
      <div className="bg-white backdrop-blur-3xl rounded-xl mb-5 flex flex-row justify-between items-center">
        <div className="p-2 flex flex-row gap-2 text-slate-500">
          <Phone className="h-5 w-5" />
          {mobile}
        </div>
        <button
          className="flex flex-row hover:text-black text-blue-800 items-center cursor-pointer p-2"
          onClick={onChangeMobile}
          aria-label="تغییر شماره همراه"
          disabled={isLoading}
        >
          تغییر شماره همراه
          <ArrowLeft className="h-3 w-3 mr-1" />
        </button>
      </div>

      {/* Expire Warning */}
      {isExpired && (
        <div
          className="mb-4 rounded-lg bg-red-50 p-3 text-center text-sm text-red-600 border border-red-200"
          role="alert"
          aria-live="assertive"
        >
          کد تأیید منقضی شده است. لطفاً کد جدید درخواست کنید.
        </div>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            name="otp"
            render={({ field, fieldState }) => (
              <FormItem className="col-span-full">
                <FormLabel>کد یکبار مصرف</FormLabel>
                <FormControl>
                  <div className="flex justify-center" dir="ltr">
                    <InputOTP
                      maxLength={OTP_CONFIG.CODE_LENGTH}
                      value={field.value}
                      onChange={field.onChange}
                      disabled={isExpired || isLoading}
                      onKeyDown={(e) => {
                        if (
                          !allowedKeysRegex.test(e.key) &&
                          !isControlKey.includes(e.key)
                        )
                          e.preventDefault();
                      }}
                      autoFocus
                      // aria-label="کد تأیید"
                      aria-invalid={!!fieldState.error}
                      aria-describedby={
                        fieldState.error ? "otp-error" : undefined
                      }
                    >
                      <InputOTPGroup className="gap-2">
                        {Array.from({ length: OTP_CONFIG.CODE_LENGTH }).map(
                          (_, index) => (
                            <InputOTPSlot
                              key={index}
                              index={index}
                              className={cn(
                                "h-12 w-12 text-lg",
                                fieldState.error && "border-destructive",
                                isExpired && "opacity-50",
                              )}
                            />
                          ),
                        )}
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                </FormControl>
                <FormMessage id="otp-error" className="text-center" />
              </FormItem>
            )}
          />
          <div className="">
            <CustomButton
              type="submit"
              variant={"outline"}
              className="w-full text-secondary-40 border-4 hover:text-white mt-10"
              disabled={isLoading || isExpired}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  در حال ورود...
                </>
              ) : (
                "ورود"
              )}
            </CustomButton>
          </div>
          {/* Display backend error */}
          {error && !isExpired && (
            <div
              className="col-span-full rounded-md bg-red-50 p-3 border border-red-200"
              role="alert"
            >
              <p className="text-sm text-red-800">
                {error.response.data.error || error.response.data.message}
              </p>
            </div>
          )}
        </form>
      </Form>
      {/* Timer and Resend Section */}
      <div className="mt-6 space-y-4">
        {/* Resend Section */}
        <div className="flex items-center justify-center gap-4">
          {canResend ? (
            <button
              type="button"
              onClick={onResend}
              disabled={isSendingOTP}
              className="flex items-center gap-2 text-sm text-primary hover:underline disabled:opacity-50 disabled:cursor-not-allowed
               transition-opacity focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded px-2 py-1"
              aria-label={isSendingOTP ? "در حال ارسال کد..." : "ارسال مجدد کد"}
            >
              {isSendingOTP ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
              {isSendingOTP ? "در حال ارسال..." : "ارسال مجدد کد"}
            </button>
          ) : (
            <div
              className="flex items-center gap-2 text-sm text-gray-400"
              role="status"
              aria-live="polite"
              aria-atomic="true"
            >
              <RefreshCw className="h-4 w-4" />
              <span>ارسال مجدد تا </span>
              <span className="font-medium tabular-nums">
                {resendCountdown}
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SendOTPSteps;
