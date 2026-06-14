import {
  type ControllerRenderProps,
  type FieldErrors,
  type FieldValues,
  type Path,
} from "react-hook-form";
import FormInput from "./FormInput";
import DatePickerField from "./DatePicker";
import TimePickerField from "./TimePicker";
import TagsInput from "./TagsInput";
import SwitchBox from "./FormSwitch/SwitchBox";
import CustomTextArea from "./Textarea";
import RadioInput from "./Radio";
import type { TFormData } from "@/types";
import ReactSelect from "./FormSelect/ReactSelect";
import FormCheck from "./FormCheck";

/**
 * @description
 * این یک نوع ترکیبی است که پراپ‌های هر فیلد را با پراپ‌های ارائه شده
 * توسط Controller در React Hook Form ادغام می‌کند.
 */
type FieldRendererProps<TFormValues extends FieldValues> =
  TFormData<TFormValues> & {
    field: ControllerRenderProps<TFormValues, Path<TFormValues>>;
    errors: FieldErrors<TFormValues>;
    rowIndex?: number;
    // setError?: UseFormSetError<TFormValues>;
    ref: (el: HTMLElement | null) => void;
  };

/**
 * @description
 * یک هوک سفارشی که یک تابع رندرکننده (renderer) برمی‌گرداند.
 * این تابع بر اساس پراپ `type`، کامپوننت فرم مناسب را انتخاب و رندر می‌کند.
 * این هوک باید در کامپوننت فرم اصلی (FormComponent) استفاده شود.
 */
function useFormField<TFormValues extends FieldValues>() {
  /**
   * @param props پراپ‌های کامل فیلد، شامل تنظیمات فیلد و پراپ‌های RHF
   * @returns یک کامپوننت JSX که باید رندر شود
   */
  const fieldRenderer = (props: FieldRendererProps<TFormValues>) => {
    // پراپ‌ها را برای خوانایی بیشتر تفکیک می‌کنیم
    const {
      type,
      name,
      field,
      errors,
      option,
      inputType,
      placeholder,
      money,
      minLength,
      maxLength,
      required,
      mode,
      offValue,
      onValue,
      showValueInWord = true,
      // mode,
      // min,
      // max,
      //  onChangeSelect,
      // medium_url,
      // original_url,
      onChange,
      // onClick,
      // setError,
      // prefix,
      ref,
      ...rest
    } = props;

    if (name === "empty" || name === "separator") return;

    // بر اساس نوع فیلد، کامپوننت مناسب را برمی‌گردانیم
    switch (type) {
      case "switch":
        return (
          <SwitchBox
            offValue={offValue as string | number | boolean}
            onValue={onValue as string | number | boolean}
            field={field}
            label={props.label}
            disabled={rest.disabled}
          />
        );

      case "select": {
        return (
          <ReactSelect
            hasError={!!errors[name]}
            field={field}
            options={option || ([] as any)}
            placeholder={placeholder}
            isDisabled={rest.disabled}
            isClearable={!required}
            mode={mode}
            // onChange={onChange}
            // ref={ref}
            {...rest}
            // onKeyDown={}
          />
        );
      }

      // case "treeSelect":
      //   return (
      //     <TreeSelectBox<TFormValues>
      //       field={field}
      //       error={error}
      //       placeholder={t(placeholder || "")}
      //       option={option || []}
      //       multiple={multiple}
      //       onValueChange={onChangeSelect}
      //       ref={ref}
      //       {...rest}
      //     />
      //   );

  //     case "checkbox":
  //        return (
  //   <FormCheck>
  //     <FormCheck.Input
  //       type="checkbox"
  //       id={name}
  //       checked={field.value}
  //       onChange={(e) => field.onChange(e.target.checked)}
  //     />
  //     <FormCheck.Label htmlFor={name}>
  //       {props.label}
  //     </FormCheck.Label>
  //   </FormCheck>
  // );

case "switch":
  return (
    <SwitchBox
      field={field}
      onValue={true}
      offValue={false}
      {...rest}
    />
  );


      case "radio":
        return (
          <RadioInput<TFormValues>
            field={field}
            option={option || []}
            onValueChange={onChange}
            // ref={ref}
            {...rest}
          />
        );

      case "date":
        return (
          <DatePickerField<TFormValues>
            hasError={!!errors[name]}
            field={field}
            min={props.minDate as any}
            max={props.maxDate as any}
            placeholder={placeholder ?? "تاریخ"}
            {...rest}
          />
        );
      case "textArea":
        return (
          <CustomTextArea
            field={field}
            hasError={!!errors[name]}
            placeholder={placeholder}
            rows={4}
          />
        );
      // case "date":
      //   return (
      //     <FormInput
      //       {...field}
      //       id={name}
      //       type="date"
      //       name={name}
      //       className={clsx({
      //         "border-danger": errors[name],
      //       })}
      //       {...rest}
      //     />
      //@ts-ignore
      // <DatePickerField<TFormValues>
      //   field={field}
      //   placeholder={placeholder || ""}
      //   error={error}
      //   // min={props.minDate}
      //   // max={props.maxDate}
      //   ref={ref}
      //   {...rest}
      // />
      // <FormInput
      //   {...register("hire_date")}
      //   id="validation-form-6"
      //   type="date"
      //   name="hire_date"
      //   className={clsx({
      //     "border-danger": errors.hire_date,
      //   })}
      // />
      // {errors.hire_date && (
      //   <div className="mt-2 text-danger">
      //     {typeof errors.hire_date.message === "string" &&
      //       errors.hire_date.message}
      //   </div>
      // );
      // case "month":
      //   return (
      //     //@ts-ignore
      //     <MonthPicker<TFormValues>
      //       field={field}
      //       error={error}
      //       min={props.minDate}
      //       max={props.maxDate}
      //       ref={ref}
      //       {...rest}
      //     />
      //   );
      case "time":
        return (
          <TimePickerField<TFormValues>
            field={field}
            hasError={!!errors[name]}
            min={props.min}
            max={props.max}
            {...rest}
          />
        );
      case "tags":
        return (
          <TagsInput<TFormValues>
            hasError={!!errors[name]}
            field={field}
            min={props.min}
            placeholder={placeholder}
            max={props.max}
            {...rest}
          />
        );

      case "textArea":
        return (
          <CustomTextArea field={field} {...rest} />
        );

      // case "textWithAlignment":
      //   return <TextWithAlignment field={field} error={error} {...rest} />;

      // case "upload":
      //   return (
      //     <FileUpload<TFormValues>
      //       field={field}
      //       error={error}
      //       multiple={multiple}
      //       {...rest}
      //     />
      //   );

      // // این مورد را برای کامپوننت آپلودر تصویر اضافه کردم
      // case "image":
      //   return (
      //     <ImageUploader<TFormValues>
      //       field={field}
      //       error={error}
      //       medium_url={medium_url}
      //       original_url={original_url}
      //       {...rest}
      //     />
      //   );

      default:
        // اگر نوعی مشخص نشده باشد، ورودی متنی پیش‌فرض را نمایش می‌دهیم

        return (
          <FormInput
            {...field}
            id={name}
            money={money}
            type={inputType}
            name={name}
            onValueChange={onChange}
            ref={ref}
            showValueInWord={showValueInWord}
            // onChange={(e) => onChange?.(e.target.value)}
            maxLength={maxLength}
            placeholder={placeholder}
            minLength={minLength}
            hasError={!!errors[name]}
            {...rest}
          />
        );
    }
  };

  return fieldRenderer;
}

export default useFormField;
