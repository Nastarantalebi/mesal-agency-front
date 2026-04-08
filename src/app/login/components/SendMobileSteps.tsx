import formTypes from "@/components/form/FormInputTypes";
import { LoginMobileFields } from "../fixtures/LoginFields";
import type { ISendMobile } from "../types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { mobileInitialValue, mobileSchema } from "../fixtures/validation";
import z from "zod";
import CustomButton from "@/components/form/CustomButton";
import { Form } from "@/components/ui/form";

interface mobileStepsProps {
  onSubmit: (data: ISendMobile) => void;
}

const SendMobileSteps = ({ onSubmit }: mobileStepsProps) => {
  const form = useForm<ISendMobile>({
    resolver: zodResolver(
      z.object({
        mobile: mobileSchema,
      }),
    ),
    defaultValues: mobileInitialValue,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {LoginMobileFields.map((item) => (
          <div
            key={String(item.name)}
            className={item.className || "col-span-1"}
          >
            {formTypes<ISendMobile>(item, form.control)}
          </div>
        ))}
        <CustomButton
          type="submit"
          variant={"outline"}
          className="w-full text-secondary-40 border-4 hover:text-white mt-10"
        >
          دریافت رمز کد یکبار مصرف
        </CustomButton>
      </form>
    </Form>
  );
};

export default SendMobileSteps;
