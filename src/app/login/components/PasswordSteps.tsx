import { useForm } from "react-hook-form";
import type { IForgotPassword } from "../types";
import { passwordValidation } from "../fixtures/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, Lightbulb, Loader2, Phone, Clock } from "lucide-react";
import formTypes from "@/components/form/FormInputTypes";
import CustomButton from "@/components/form/CustomButton";
import { Form } from "@/components/ui/form";
import useLoginFields from "../hooks/useLoginFields";

interface PasswordStepProps {
  mobile: string;
  otp: string;
  onSubmit: (data: IForgotPassword) => void;
  onChangeMobile: () => void;
  isLoading: boolean;
  isExpired: boolean;
  error?: any;
  expireCountdown: string;
}
const PasswordSteps = ({
  mobile,
  otp,
  onSubmit,
  onChangeMobile,
  isLoading,
  isExpired,
  error,
  expireCountdown,
}: PasswordStepProps) => {
  const form = useForm<IForgotPassword>({
    resolver: zodResolver(passwordValidation),
    defaultValues: {
      mobile,
      otp,
      new_password: "",
      confirm_password: "",
    },
  });
  const { LoginNewPasswordFields } = useLoginFields();

  return (
    <div className="overflow-y-hidden">
      <Alert className="flex items-center px-4 py-3 mb-5 backdrop-blur-3xl rounded-[0.6rem] leading-[1.7]">
        <Lightbulb className="w-15 h-15 mb-1 text-default" />
        <AlertDescription>
          <p className="font-medium mb-2 text-default">
            لطفاً رمز عبور خود را تعیین کنید
          </p>
          <p className="text-xs text-default">
            شما می‌توانید با این رمز عبور در دفعات بعد وارد شوید
          </p>
        </AlertDescription>
      </Alert>
      {/* mobile display*/}
      <div className="bg-white backdrop-blur-3xl rounded-xl mb-5 flex flex-row justify-between items-center">
        <div className="p-2 flex flex-row gap-2 text-slate-500">
          <Phone className="h-5 w-5" />
          {mobile}
        </div>
        <button
          className="flex flex-row hover:text-black text-blue-800 items-center cursor-pointer p-2"
          onClick={onChangeMobile}
          disabled={isLoading}
          aria-label="تغییر شماره همراه"
        >
          تغییر شماره همراه
          <ArrowLeft className="h-3 w-3 mr-1" />
        </button>
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
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {LoginNewPasswordFields.map((item) => (
            <div
              key={String(item.name)}
              className={item.className || "col-span-1 mb-2"}
            >
              {formTypes<IForgotPassword>(item, form.control)}
            </div>
          ))}
          <div className="">
            <CustomButton
              type="submit"
              variant={"outline"}
              className="w-full border-4  mt-10 hover:bg-primary/10 hover:text-primary text-primary"
              disabled={isLoading || isExpired}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  در حال ایجاد رمز عبور...
                </>
              ) : (
                <>ایجاد رمز عبور و ورود</>
              )}
            </CustomButton>
          </div>
        </form>
      </Form>
      {/* OTP Expiration Warning */}
      {isExpired ? (
        <div
          className="mb-4 rounded-lg bg-red-50 p-3 text-center text-sm text-red-600 border border-red-200"
          role="alert"
          aria-live="assertive"
        >
          کد تأیید منقضی شده است. لطفاً مجدداً درخواست کد دهید.
        </div>
      ) : (
        <div
          className="my-4 flex items-center justify-center gap-2 text-sm text-gray-600"
          role="timer"
          aria-live="polite"
        >
          <Clock className="h-4 w-4" />
          <span>اعتبار کد: </span>
          <span className="font-medium tabular-nums">{expireCountdown}</span>
        </div>
      )}
    </div>
  );
};

export default PasswordSteps;
