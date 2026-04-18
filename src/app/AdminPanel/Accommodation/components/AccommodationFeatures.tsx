import CustomButton from "@/components/form/CustomButton";
import FormErrorModal from "@/components/form/FormErrorModal";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { accommodationFeatureListInitialValues, accommodationFeatureListValidation } from "../fixtures/Validation";
import { useAccommodationFeatures } from "../services/useAccommodation";
import type {
  Props,
  TCAccommodationFeature,
  TFeatureListForm
} from "../types";

const AccommodationFeatures = ({ AccommodationId }: Props) => {

  const { accommodationFeatures, accommodationFeatureList, postAccommodationFeatures, deleteAccommodatioFeature} = useAccommodationFeatures(AccommodationId);

  const form = useForm<TFeatureListForm>({
    resolver: zodResolver(accommodationFeatureListValidation),
    defaultValues: accommodationFeatureListInitialValues,
  });

  const [errorOpen, setErrorOpen] = useState(false);
  const errmessage = "ثبت فرم با خطا مواجه شد، لطفاً دوباره تلاش کنید.";
  

  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  
  const allAddedFeaturesIds = accommodationFeatureList.data?.results.map(
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
    postAccommodationFeatures.mutateAsync(
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
            {accommodationFeatures.data ? (
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {accommodationFeatures.data.results?.map((f) => {
                    const isAdded = allAddedFeaturesIds?.includes(f.id);
                    const selected = selectedIds.includes(f.id) && !isAdded;
                    return (
                      <Badge
                        key={f.id}
                        variant="outline"
                        onClick={() => {!isAdded && toggle(f.id)}}
                        className={`
                          cursor-pointer px-6 py-2
                          ${isAdded ? "cursor-not-allowed bg-accent/20 border-accent" : ""}
                          ${selected ? "bg-green-400/10 text-black border-green-400" : ""}
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
            {accommodationFeatureList.data?.results.length ? (
              <CardContent className="">
                <div className="flex flex-wrap gap-2">
                  {accommodationFeatureList.data?.results.map((f) => {
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
                            onClick={() => {deleteAccommodatioFeature.mutateAsync({ id: f.id }); setSelectedIds(selectedIds.filter((id) => id !== f.id));}}
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
