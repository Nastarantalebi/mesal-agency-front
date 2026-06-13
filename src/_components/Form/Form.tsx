import {
  type FieldValues,
  type SubmitHandler,
  type UseFormReturn,
} from "react-hook-form";
import { useEffect } from "react";
import clsx from "clsx";
import FormBody from "./FormBody";
import { Loader2, XCircle } from "lucide-react";
import { FocusRegistryProvider } from "./FocusRegistryContext";
import { useHotkeys } from "react-hotkeys-hook";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import type { TFormData } from "@/types";
import { prepareFormValues } from "@/utils/formValues";

// This defines the shape of the configuration object for each dynamic field.

// Props for the main FormComponent
// The generic type is now TFormValues, which represents the shape of the form data.
type TProps<TFormValues extends FieldValues> = {
  form: UseFormReturn<TFormValues>;
  data?: TFormValues;
  onSubmit: SubmitHandler<TFormValues>;
  // `formFields` is optional, allowing for forms built entirely with `children`.
  formFields?: (TFormData<TFormValues> | undefined)[];
  formClassName?: string;
  className?: string;
  bodyClassName?: string;
  // `children` allows passing custom FormField components.
  children?: React.ReactNode;
  // Renders a custom button or the default BtnSubmit.
  button?: React.ReactNode;
  extraField?: React.ReactNode;
  size?: "large" | "small" | "custom";
  isLoading?: boolean;
  isSubmitting?: boolean;
  childrenFirst?: boolean;
  showSubmitButton?: boolean;
  disabledBtn?: boolean;
  btnSubmitText?: string;
  enableCtrlEnterSubmit?: boolean;
  // title?: string;
  onClose?: () => void;
};

/**
 * A powerful, reusable form component that can be driven by a configuration
 * array (`formFields`) or by passing `FormField` components as `children`.
 */
function FormComponent<TFormValues extends FieldValues>({
  form,
  data,
  onSubmit,
  formFields,
  formClassName,
  className,
  bodyClassName,
  children,
  size = "large",
  button,
  extraField,
  // isLoading,
  isSubmitting,
  childrenFirst,
  showSubmitButton,
  btnSubmitText = "ثبت اطلاعات",
  disabledBtn = false,
  enableCtrlEnterSubmit = true,
  onClose,
}: // title,
TProps<TFormValues>) {
  // const { setTitle } = useBreadcrumbState();

  // useEffect(() => {
  //   if (!isLoading && title) {
  //     setTitle(title);
  //   }
  // }, [isLoading, title, setTitle]);

  useEffect(() => {
    if (data) {
      form.reset(prepareFormValues(form.getValues(), data));
    }
  }, [data, form]);

  // if (isLoading) return <LoadingSpin />;
  useHotkeys(
    "ctrl+enter, shift+enter",
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      // const active = document.activeElement;

      // if (!formRef.current?.contains(active)) return;

      // Check if already submitting or disabled
      if (form.formState.isSubmitting || isSubmitting || disabledBtn) {
        return;
      }

      // Trigger form submission
      form.handleSubmit(onSubmit)();
    },
    {
      enabled: enableCtrlEnterSubmit,
      enableOnFormTags: true,
      preventDefault: true,
      // scopes: isInModal ? (scope ?? "modal") : `page-${paneId}`, // Different scopes for modal vs page
    },
    [
      form,
      onSubmit,
      isSubmitting,
      disabledBtn,
      enableCtrlEnterSubmit,
      // paneId,
    ],
  );
  return (
    <FocusRegistryProvider>
      <Form {...form}>
        {" "}
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={clsx(formClassName)}
          onKeyDown={(e) => {
            if (e.key !== "Enter") return;

            // Allow Enter inside textareas (new line) and on buttons
            const target = e.target as HTMLElement;
            const tag = target.tagName.toLowerCase();
            if (tag === "textarea" || tag === "button") return;

            // Allow the intended submit combos
            if (e.ctrlKey || e.metaKey || e.shiftKey) return;

            // Block native single-Enter submit
            e.preventDefault();
          }}
          autoComplete="off"
        >
          <div
            className={clsx(
              "relative space-y-4 p-2 m-2 border border-primary-20 rounded-xl shadow bg-transparent",
              className,
            )}
          >
            {onClose && (
              <Button
                variant="outline"
                type="button"
                className="absolute top-0 end-0 m-2 p-0"
                onClick={onClose}
              >
                <XCircle className="text-danger size-5" />
              </Button>
            )}
            <div
              className={clsx("grid gap-4 p-2", bodyClassName, {
                "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4":
                  size === "small",
                "md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6":
                  size === "large",
              })}
            >
              {childrenFirst && children}

              {/* Render dynamically generated fields if they exist */}
              <FormBody<TFormValues>
                formFields={formFields}
                control={form.control}
                // setError={form.setError}
                errors={form.formState.errors}
              />
              {/* Render any custom children passed to the component */}
              {!childrenFirst && children}
            </div>
            {/* Render the custom button or the default submit button */}
            {/* Render the custom button or the default submit button */}
            {button
              ? button
              : showSubmitButton !== false && (
                  <div className="flex justify-end">
                    <Button
                      disabled={disabledBtn}
                      // isPending={isSubmitting || form.formState.isSubmitting}
                      variant="primary"
                      type="submit"
                      className="mt-5"
                    >
                      {isSubmitting || form.formState.isSubmitting ? <Loader2/> : btnSubmitText}
                    </Button>
                  </div>
                )}
          </div>

          {extraField}
        </form>
      </Form>
    </FocusRegistryProvider>
  );
}

export default FormComponent;
