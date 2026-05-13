import { useForm } from "react-hook-form";
import {
  newsInitialValues,
  newsValidation,
  type TNews,
} from "../../fixtures/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import FormComponent from "@/components/form/FormComponent";
import NewsFields from "../../fixtures/newsFields";
import { useNews } from "../../services/useSetting";
import { shamsiToMiladi } from "@/components/form/DateConverter";

const NewsForm = () => {
  const newsFields = NewsFields();
  const { postNews } = useNews();
  const form = useForm<TNews>({
    resolver: zodResolver(newsValidation),
    defaultValues: newsInitialValues,
  });

  console.log(form.watch());

  const handleSubmit = (values: TNews) => {
    
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (value === null) return;
      const finalValue =
        key === "published_date" ? shamsiToMiladi(value as string) : value;
      formData.append(key, finalValue as any);
    });

    postNews.mutateAsync(formData);
  };

  return (
    <FormComponent
      form={form}
      handleSubmit={handleSubmit}
      buttonText="ثبت"
      fields={newsFields}
    />
  );
};

export default NewsForm;
