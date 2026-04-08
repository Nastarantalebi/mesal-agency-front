import { useForm } from "react-hook-form";
import type { IForgotPassword } from "../types";
import { passwordValidation } from "../fixtures/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Lightbulb } from "lucide-react";
import formTypes from "@/components/form/FormInputTypes";
import { LoginNewPasswordFields } from "../fixtures/LoginFields";
import CustomButton from "@/components/form/CustomButton";
import { Form } from "@/components/ui/form";

interface PasswordStepProps {
  mobile: string;
  otp: string;
  onSubmit: (data: IForgotPassword) => void;
}
const PasswordSteps = ({ mobile, otp, onSubmit }: PasswordStepProps) => {
  const form = useForm<IForgotPassword>({
    resolver: zodResolver(passwordValidation),
    defaultValues: {
      mobile,
      otp,
      new_password: "",
      confirm_password: "",
    },
  });

  return (
    <div className="">
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
              className="w-full text-secondary-40 border-4 hover:text-white mt-10"
            >
                ایجاد رمز عبور و ورود
            </CustomButton>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PasswordSteps;
