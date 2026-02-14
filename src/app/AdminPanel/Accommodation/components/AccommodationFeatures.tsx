import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import type { TFeatureResponse } from "../../AccommodationFeatures/types";
import type { TPaginatedResponse } from "@/types";
import {
  accommodation_url,
  features_key,
  features_url,
} from "@/data/querykeys";
import useGetData from "@/services/useGetData";
import usePostData from "@/services/usePostData";
import type {
  TAccommodationFeatureResponse,
  TCAccommodationFeature,
} from "../types";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import CustomButton from "@/components/form/CustomButton";
import { Form } from "@/components/ui/form";
import FormErrorModal from "@/components/FormErrorModal";

const featureListValidation = z.object({
  feature: z.array(z.number()).min(1, "لطفاً حداقل یک ویژگی را انتخاب کنید"),
});

const featureListInitialValues = {
  feature: [],
};

type TFeatureListForm = z.infer<typeof featureListValidation>;

interface Props {
  accommodationId: string;
}

const AccommodationFeatures = ({ accommodationId }: Props) => {
  const form = useForm<TFeatureListForm>({
    resolver: zodResolver(featureListValidation),
    defaultValues: featureListInitialValues,
  });

  const [errorOpen, setErrorOpen] = useState(false);
  const errmessage = "ثبت فرم با خطا مواجه شد، لطفاً دوباره تلاش کنید.";

  const { data: accommodationFeaturesData } = useGetData<
    TPaginatedResponse<TFeatureResponse>
  >({
    key: [features_key, String(accommodationId)],
    url: `${features_url}?type=accommodation`,
  });

  const { data: accommodationFeatureList } =
    useGetData<TAccommodationFeatureResponse>({
      key: ["accommodation-features", String(accommodationId)],
      url: `${accommodation_url}${accommodationId}/features/`,
      enabled: !!accommodationId,
    });

  const submitFeatures = usePostData<
    TCAccommodationFeature,
    TAccommodationFeatureResponse
  >({
    key: ["accommodation-features"],
    url: `${accommodation_url}${accommodationId}/features/`,
  });

  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const toggle = (id: number) => {
    setSelectedIds((prev) => {
      const newSelection = prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id];

      form.setValue("feature", newSelection, { shouldValidate: true });

      return newSelection;
    });
  };

  const handleSubmit = (values: TCAccommodationFeature) => {
    submitFeatures.mutateAsync(
      { feature: values.feature },
      {
        onSuccess: () => {
          toast.success("ویژگی‌ها با موفقیت ثبت شد");
          form.reset();
          setSelectedIds([]);
        },
        onError: () => setErrorOpen(true),
      },
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="flex flex-col gap-5 items-start justify-start">
          <Card>
            <CardTitle className="mr-5"> ویژگی های مربوط به اقامتگاه</CardTitle>
            {accommodationFeaturesData ? (
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {accommodationFeaturesData.results?.map((f) => {
                    const selected = selectedIds.includes(f.id);
                    return (
                      <Badge
                        key={f.id}
                        variant="outline"
                        onClick={() => toggle(f.id)}
                        className={
                          "cursor-pointer px-6 py-2 " +
                          (selected
                            ? "bg-green-400/10 text-black border-green-400"
                            : "")
                        }
                      >
                        {f.title}
                      </Badge>
                    );
                  })}
                </div>
              </CardContent>
            ) : (
              <CardContent>داده ای برای نمایش وجود ندارد</CardContent>
            )}
          </Card>
          <CustomButton type="submit">ثبت</CustomButton>
        </div>
        {/* <div className="flex flex-col gap-5 items-start justify-start">
          <Card className="shadow-lg shadow-primary/50">
            <CardTitle className="text-center text-sm font-light">
              ویژگی های اضافه شده
            </CardTitle>
            <div>
              <CardContent className="flex flex-wrap gap-2">
                {accommodationFeatureList?.map((f) => {
                  return (
                    <Badge
                      key={f.id}
                      variant="primary"
                      className="px-6 py-2 bg-accent/70 text-black"
                    >
                      {f.feature.title}
                    </Badge>
                  );
                })}
              </CardContent>
            </div>
          </Card>
        </div> */}
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

export default AccommodationFeatures;
