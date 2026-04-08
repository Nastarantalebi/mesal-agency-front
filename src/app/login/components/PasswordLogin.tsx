import { useForm } from "react-hook-form";
import { type ILogingForm } from "../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginInitialValue, loginvalidation } from "../fixtures/validation";
import { LoginPassWordFields } from "../fixtures/LoginFields";
import formTypes from "@/components/form/FormInputTypes";
import CustomButton from "@/components/form/CustomButton";
import { Form } from "@/components/ui/form";
import usePasswordLogin from "../services/usePasswordLogin";
import { useState } from "react";
import ForgetPassword from "./ForgetPassword";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Lightbulb } from "lucide-react";

const PasswordLogin = () => {
  const form = useForm<ILogingForm>({
    resolver: zodResolver(loginvalidation),
    defaultValues: loginInitialValue,
  });
  const { mutateAsync: passwordLogin } = usePasswordLogin();

  const [forgetPassword, setForgetPassword] = useState(false);

  const handleSubmit = (data: ILogingForm) => {
    passwordLogin(data);
  };

  return forgetPassword ? (
    <ForgetPassword setForgetPassword={setForgetPassword} />
  ) : (
    <>
      <Alert className="flex items-center px-4 py-3 mb-5 bg-primary-20 border-primary-30 rounded-[0.6rem] leading-[1.7]">
        <Lightbulb className="w-15 h-15 mb-1 text-default" />
        <AlertDescription>
          <div className="text-default">
            برای ورود
            <span className="font-medium"> شماره همراه </span> و
            <span className="font-medium"> رمز عبور </span>
            خود را وارد کنید.
          </div>
        </AlertDescription>
      </Alert>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          {LoginPassWordFields.map((item) => (
            <div
              key={String(item.name)}
              className={item.className || "col-span-1"}
            >
              {formTypes<ILogingForm>(item, form.control)}
            </div>
          ))}
          <div className="">
            <CustomButton
              type="submit"
              variant={"outline"}
              className="w-full text-secondary-40 border-4 hover:text-white mt-10"
            >
              ورود
            </CustomButton>
          </div>
          <div
            className="flex flex-row hover:text-black text-blue-800 items-center cursor-pointer p-2"
            onClick={() => setForgetPassword(true)}
          >
            فراموشی رمز عبور؟
          </div>
        </form>
      </Form>
    </>
  );
};

export default PasswordLogin;
