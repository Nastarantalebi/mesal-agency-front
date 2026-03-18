import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
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
import type { TFeatureResponse } from "../../settings/types";
import useDeleteData from "@/services/useDeleteData";
import { X } from "lucide-react";

const featureListValidation = z.object({
  feature: z.array(z.number()).min(1, "لطفاً حداقل یک ویژگی را انتخاب کنید"),
});

const featureListInitialValues = {
  feature: [],
};

type TFeatureListForm = z.infer<typeof featureListValidation>;

interface Props {
  accommodationId: number;
}

const AccommodationFeatures = ({ accommodationId }: Props) => {
  const form = useForm<TFeatureListForm>({
    resolver: zodResolver(featureListValidation),
    defaultValues: featureListInitialValues,
  });

  const [errorOpen, setErrorOpen] = useState(false);
  const errmessage = "ثبت فرم با خطا مواجه شد، لطفاً دوباره تلاش کنید.";
  const key = ["accommodation-features", String(accommodationId)];
  const url = `${accommodation_url}${accommodationId}/features/`;

  const { data: accommodationFeaturesData } = useGetData<
    TPaginatedResponse<TFeatureResponse>
  >({
    key: [features_key, String(accommodationId)],
    url: `${features_url}?type=accommodation`,
  });

  const { data: accommodationFeatureList } = useGetData<
    TPaginatedResponse<TAccommodationFeatureResponse>
  >({
    key: ["accommodation-features", String(accommodationId)],
    url: `${accommodation_url}${accommodationId}/features/`,
    enabled: !!accommodationId,
  });

  const submitFeatures = usePostData<
    TCAccommodationFeature,
    TAccommodationFeatureResponse
  >({
    key,
    url,
  });

  const { mutateAsync: deleteFeature } = useDeleteData({
    key,
    url,
  });


  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  
  const allAddedFeaturesIds = accommodationFeatureList?.results.map(
    (r) => r.feature.id,
  );

  
  const toggle = (id: number) => {

    setSelectedIds((prev) => {
      const newSelection = prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id];

        const resultSelection = Array.from(new Set([...newSelection, ...(allAddedFeaturesIds || [])]));

        form.setValue("feature", resultSelection, { shouldValidate: true });
        return resultSelection;
      });
    };

    

  const handleSubmit = (values: TCAccommodationFeature) => {
    submitFeatures.mutateAsync(
      { feature: values.feature },
      {
        onSuccess: () => {
          form.reset();
          setSelectedIds([]);
        },
      },
    );
  };



  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="grid grid-cols-2">
          <Card className="grid-cols-1 ml-2">
            <CardTitle className="mx-5"> ویژگی های مربوط به اقامتگاه</CardTitle>
            {accommodationFeaturesData ? (
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {accommodationFeaturesData.results?.map((f, index) => {
                    const isAdded = allAddedFeaturesIds?.includes(f.id);
                    console.log(`index=${index}`);
                    console.log(`isAdded items: ${isAdded}`);
                    const selected = selectedIds.includes(f.id) && !isAdded;
                    console.log(`selected items: ${selected}`);
                    return (
                      <Badge
                        key={f.id}
                        variant="outline"
                        onClick={() => {!isAdded && toggle(f.id)}}
                        className={`
                          px-6 py-2
                          ${isAdded ? "bg-accent/20 border-accent" : ""}
                          ${selected ? "bg-green-400/10 text-black border-green-400 cursor-pointer" : ""}
                        `}
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
          <Card>
            <CardTitle className="mx-5">ویژگی های افزوده شده</CardTitle>
            {accommodationFeatureList?.results.length ? (
              <CardContent className="">
                <div className="flex flex-wrap gap-2">
                  {accommodationFeatureList?.results.map((f) => {
                    return (
                      <>
                        <Badge
                          key={f.id}
                          variant="primary"
                          className="px-6 py-2 bg-accent/70 text-black relative pr-10"
                        >
                          {f.feature.title}
                          <button
                            type="button"
                            onClick={() => {deleteFeature({ id: f.id }); setSelectedIds(selectedIds.filter((id) => id !== f.id));}}
                            className="absolute right-1 top-1/2 -translate-y-1/2 bg-destructive/20 hover:bg-destructive/40 rounded-full p-1.5 cursor-pointer"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      </>
                    );
                  })}
                </div>
              </CardContent>
            ) : (
              <CardContent>
                هیچ ویژگی اضافه نشده است. از لیست سمت راست اضافه کنید.
              </CardContent>
            )}
          </Card>
        </div>
        <CustomButton type="submit" className="mt-5">
          ثبت
        </CustomButton>
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
