import { useForm } from "react-hook-form";
import {
  newsInitialValues,
  newsValidation,
  type TNews,
} from "../../fixtures/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import FormComponent from "@/components/form/FormComponent";
import {
  miladiToShamsi,
  shamsiToMiladi,
} from "@/components/form/DateConverter";
import { useEffect, type Dispatch, type SetStateAction } from "react";
import NewsFields from "../../fixtures/NewsFields";
import { useNews } from "../../services/useSetting";

interface Props {
  newsId?: number;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const NewsForm = ({ newsId, setOpen }: Props) => {
  const isEdit = !!newsId;
  const { postNews, getNewsById, patchNews } = useNews({ id: newsId });
  const newsFields = NewsFields(getNewsById.data?.image);

  const form = useForm<TNews>({
    resolver: zodResolver(newsValidation),
    defaultValues: newsInitialValues,
  });
  useEffect(() => {
    if (isEdit && getNewsById?.data) {
      const data = getNewsById.data;

      form.reset({
        title: data.title,
        description: data.description,
        short_description: data.short_description,
        published_date: miladiToShamsi(data.published_date),
        type: data.type.value as "news" | "announcement",
        status: data.status.value as "draft" | "active" | "archived",
        priority: data.priority.value as "normal" | "high" | "urgent",
        image: null,
      });
    }
  }, [getNewsById.data, isEdit]);


  const handleSubmit = async (values: TNews) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (value === null) return;
      const finalValue =
        key === "published_date" ? shamsiToMiladi(value as string) : value;
      formData.append(key, finalValue as any);
    });
    if (isEdit) {
      await patchNews.mutateAsync(
        { data: formData, id: newsId },
        { onSuccess: () => setOpen(false) },
      );
    } else {
      await postNews.mutateAsync(formData, {
        onSuccess: () => {
          setOpen(false);
          form.reset(newsInitialValues);
        },
      });
    }
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
