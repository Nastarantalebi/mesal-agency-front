import { Form } from "../ui/form";
import type {
  FieldValues,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form";
import type { Items } from "./FormInputTypes";
import CustomButton from "./CustomButton";
import { type ReactNode } from "react";
import FormErrorModal from "./FormErrorModal";
import FormBody from "./FormBody";

interface FormProps<TFormValues extends FieldValues> {
  form: UseFormReturn<TFormValues>;
  fields?: Items<TFormValues>[];
  buttonText?: string;
  handleSubmit: SubmitHandler<TFormValues>;
  children?: ReactNode;
  className?: string;
  errorOpen?: boolean;
  setErrorOpen?: any;
  errmessage?: string;
  showButton?: boolean;
}

const FormComponent = <TFormValues extends FieldValues>({
  form,
  fields,
  buttonText = "ثبت",
  handleSubmit,
  children,
  errorOpen,
  setErrorOpen,
  showButton = true,
  errmessage = "ثبت فرم با خطا مواجه شد، لطفاً دوباره تلاش کنید.",
}: FormProps<TFormValues>) => {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="grid w-full min-w-0 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start"
      >
        <FormBody fields={fields} control={form.control} />
        {children && (
          <div className="col-span-1 md:col-span-2 lg:col-span-4">
            {children}
          </div>
        )}
        {showButton && (
          <div className="col-span-1 md:col-span-2 lg:col-span-4 flex justify-end gap-3">
            <CustomButton type="submit">{buttonText}</CustomButton>
          </div>
        )}
      </form>
      <FormErrorModal
        open={errorOpen}
        message={errmessage}
        onOpenChange={setErrorOpen}
        onAcknowledge={() => setErrorOpen(false)}
      />
    </Form>
  );
};

export default FormComponent;
