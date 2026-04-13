import formTypes from "@/components/form/FormInputTypes";
import type { ISendMobile } from "../types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { mobileInitialValue, mobileSchema } from "../fixtures/validation";
import z from "zod";
import CustomButton from "@/components/form/CustomButton";
import { Form } from "@/components/ui/form";
import useLoginFields from "../hooks/useLoginFields";

interface mobileStepsProps {
  onSubmit: (data: ISendMobile) => void;
  error?: any;
}

const SendMobileSteps = ({ onSubmit, error }: mobileStepsProps) => {
  const form = useForm<ISendMobile>({
    resolver: zodResolver(
      z.object({
        mobile: mobileSchema,
      }),
    ),
    defaultValues: mobileInitialValue,
  });
  const {LoginMobileFields} = useLoginFields()
  return (
    <>
      {/* Display backend error */}
      {error && (
        <div className="col-span-full rounded-md bg-red-50 p-3 border border-red-200">
          <p className="text-sm text-red-800">
            {error.response.status === 429
              ? "تعداد درخواست‌ها بیش از حد مجاز است لطفا دقایقی دیگر تلاش کنید."
              : (error.response.data.message ?? error.response.data.error)}
          </p>
        </div>
      )}
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
    </>
  );
};

export default SendMobileSteps;
