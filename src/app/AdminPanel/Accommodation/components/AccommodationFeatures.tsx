import CustomButton from "@/components/form/CustomButton";
import FormErrorModal from "@/components/form/FormErrorModal";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { use, useState } from "react";
import { useForm } from "react-hook-form";
import {
  accommodationFeatureListInitialValues,
  accommodationFeatureListValidation,
} from "../fixtures/Validation";
import { useAccommodationFeatures } from "../services/useAccommodation";
import type { Props, TCAccommodationFeature, TFeatureListForm } from "../types";
import CardPagination from "@/components/card/CardPagination";

const AccommodationFeatures = ({ AccommodationId }: Props) => {
  const {
    accommodationFeatures,
    accommodationFeatureList,
    postAccommodationFeatures,
    deleteAccommodatioFeature,
  } = useAccommodationFeatures(AccommodationId);

  const [currentAccommodationFeaturePage, setCurrentAccommodationFeaturePage] =
    useState(1);

  const accommodationFeaturesPageCount = accommodationFeatures.data?.count
    ? Math.ceil(accommodationFeatures.data.count / 10)
    : 0;

  const form = useForm<TFeatureListForm>({
    resolver: zodResolver(accommodationFeatureListValidation),
    defaultValues: accommodationFeatureListInitialValues,
  });

  const [errorOpen, setErrorOpen] = useState(false);
  const errmessage = "ثبت فرم با خطا مواجه شد، لطفاً دوباره تلاش کنید.";

  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const allAddedFeaturesIds = accommodationFeatureList.data?.results.map(
    (r) => r.feature.id,
  );

  const toggle = (id: number) => {
    setSelectedIds((prev) => {
      const newSelection = prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id];

      const resultSelection = Array.from(
        new Set([...newSelection, ...(allAddedFeaturesIds || [])]),
      );

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
        <Card className="w-fit mt-10">
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
                      onClick={() => {
                        !isAdded && toggle(f.id);
                      }}
                      className={`
                          cursor-pointer pl-5 py-2 relative 
                          ${isAdded ? "bg-accent/20 border-accent pr-10" : ""}
                          ${selected ? "bg-green-400/10 text-black border-green-400" : ""}
                        `}
                    >
                      {accommodationFeatureList.data?.results.map(
                        (feature) =>
                          feature.feature.id === f.id && (
                            <button
                              className="absolute right-1 top-1/2 -translate-y-1/2 bg-destructive/20 hover:bg-destructive/40 rounded-full p-1.5 cursor-pointer"
                              onClick={() => {
                                setOpenDelete(true);
                                setSelectedId(feature.id);
                              }}
                            >
                              <X className="h-3 w-3" />
                            </button>
                          ),
                      )}
                      {f.title}
                    </Badge>
                  );
                })}
              </div>
            </CardContent>
          ) : (
            <CardContent>داده ای برای نمایش وجود ندارد</CardContent>
          )}
          <CardPagination
            currentPage={currentAccommodationFeaturePage}
            onPageChange={setCurrentAccommodationFeaturePage}
            pageCount={accommodationFeaturesPageCount}
          />
        </Card>

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
      <FormErrorModal
        open={openDelete}
        onOpenChange={() => setOpenDelete(false)}
        onAcknowledge={() =>
          deleteAccommodatioFeature.mutateAsync(
            { id: selectedId! },
            { onSuccess: () => setSelectedId(null) },
          )
        }
        buttonTitle="بله"
        dialogTitle="حذف"
      />
    </Form>
  );
};

export default AccommodationFeatures;
