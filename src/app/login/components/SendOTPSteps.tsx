import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useForm } from "react-hook-form";
import { otpValidation } from "../fixtures/validation";
import type { ISendOTP, TOtpStep } from "../types";
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
import { ArrowLeft, Phone } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";

const OTP_CONFIG = {
  CODE_LENGTH: 6,
} as const;

interface otpProps {
  mobile: string;
  onSubmit: (data: ISendOTP) => void;
  setStep : Dispatch<SetStateAction<TOtpStep>>
  sendingOTP: boolean;
}

const SendOTPSteps = ({ mobile, onSubmit, setStep }: otpProps) => {
  const form = useForm<ISendOTP>({
    resolver: zodResolver(otpValidation),
    defaultValues: { mobile, otp: "" },
  });

  return (
    <>
      <div className="bg-white backdrop-blur-3xl rounded-xl mb-5 flex flex-row justify-between items-center">
        <div className="p-2 flex flex-row gap-2 text-slate-500">
          <Phone className="h-5 w-5"/>
          {mobile}
        </div>
        <div
          className="flex flex-row hover:text-black text-blue-800 items-center cursor-pointer p-2"
          onClick={() => setStep("mobile")}
        >
          تغییر شماره همراه
          <ArrowLeft className="h-3 w-3 mr-1" />

        </div>
      </div>
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
                      // disabled={isExpired || isLoading}
                      // onKeyDown={(e) => {
                      //   if (
                      //     !allowedKeysRegex.test(e.key) &&
                      //     !isControlKey.includes(e.key)
                      //   )
                      //     e.preventDefault();
                      // }}
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
                                //   isExpired && "opacity-50 cursor-not-allowed",
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
            >
              ورود
            </CustomButton>
          </div>
        </form>
      </Form>
    </>
  );
};

export default SendOTPSteps;
// function zodResolver(
//   otpSchema: any,
// ): import("react-hook-form").Resolver<ISendOTP, any, ISendOTP> | undefined {
//   throw new Error("Function not implemented.");
// }
