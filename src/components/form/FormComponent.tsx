import { Form } from "../ui/form";
import type {
  FieldValues,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form";
import type { Items } from "./FormInputTypes";
import formTypes from "./FormInputTypes";
import CustomButton from "./CustomButton";
import { type ReactNode } from "react";
import FormErrorModal from "./FormErrorModal";

interface FormProps<TFormValues extends FieldValues> {
  form: UseFormReturn<TFormValues>;
  fields?: Items<TFormValues>[];
  buttonText?: string;
  handleSubmit: SubmitHandler<TFormValues>;
  children?: ReactNode;
  className?: string;
  errorOpen: boolean;
  setErrorOpen: any;
  errmessage?: string;
}

const FormComponent = <TFormValues extends FieldValues>({
  form,
  fields,
  buttonText,
  handleSubmit,
  children,
  errorOpen,
  setErrorOpen,
  errmessage = "ثبت فرم با خطا مواجه شد، لطفاً دوباره تلاش کنید.",
}: FormProps<TFormValues>) => {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="grid w-full min-w-0 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start"
      >
        {fields?.map((item) => (
          <div
            key={String(item.name)}
            className={item.className || "col-span-1"}
          >
            {formTypes<TFormValues>(item, form.control)}
          </div>
        ))}
        {children && (
          <div className="col-span-1 md:col-span-2 lg:col-span-4">
            {children}
          </div>
        )}

        <div className="col-span-1 md:col-span-2 lg:col-span-4 flex justify-end gap-3">
          <CustomButton type="submit">{buttonText}</CustomButton>
        </div>
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
