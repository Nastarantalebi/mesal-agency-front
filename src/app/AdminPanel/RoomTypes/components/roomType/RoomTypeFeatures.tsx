import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type {
  Props,
  TCRoomTypeFeature,
  TRoomTypeFeatureListForm,
} from "../../types";
import {
  roomTypeFeatureListInitialValues,
  roomTypeFeatureListValidation,
} from "../../fixtures/Validation";
import { useRoomTypeFeatures } from "../../services/useRoomType";
import CardPagination from "@/components/card/CardPagination";
import FormComponent from "@/_components/Form/Form";

const RoomTypeFeatures = ({
  AccommodationId,
  RoomTypeId,
  open,
  onOpenChange,
}: Props) => {
  const form = useForm<TRoomTypeFeatureListForm>({
    resolver: zodResolver(roomTypeFeatureListValidation),
    defaultValues: roomTypeFeatureListInitialValues,
  });

  const [currentRoomTypeFeaturePage, setCurrentRoomTypeFeaturePage] =
    useState(1);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const {
    getFeatures,
    getRoomTypeFeatures,
    postRoomTypeFeatures,
    deleteRoomTypeFeatures,
  } = useRoomTypeFeatures(
    AccommodationId,
    RoomTypeId!,
    currentRoomTypeFeaturePage,
  );

  const roomTypeFeaturesPageCount = getFeatures.data?.count
    ? Math.ceil(getFeatures.data.count / 10)
    : 0;

  const allAddedFeaturesIds = getRoomTypeFeatures.data?.map(
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

  const handleSubmit = (values: TCRoomTypeFeature) => {
    postRoomTypeFeatures.mutateAsync(
      { feature: values.feature },
      {
        onSuccess: () => {
          onOpenChange?.(false);
          form.reset();
          setSelectedIds([]);
        },
      },
    );
  };

  // Reset state when dialog closes
  useEffect(() => {
    if (!open) {
      form.reset();
      setSelectedIds([]);
    }
  }, [open, form]);

  return (
    <FormComponent<TRoomTypeFeatureListForm>
      form={form}
      onSubmit={handleSubmit}
    >
      <Card className="shadow-lg  col-span-full">
        <CardTitle className="text-center text-lg font-bold ">
          ویژگی های مربوط به اتاق
        </CardTitle>
        {getFeatures.data ? (
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {getFeatures.data.results?.map((f) => {
                const isAdded = allAddedFeaturesIds?.includes(f.id);
                const selected = selectedIds.includes(f.id) && !isAdded;
                return (
                  <Badge
                    key={f.id}
                    variant="outline"
                    onClick={() => {
                      !isAdded && toggle(f.id);
                    }}
                    className={`cursor-pointer px-6 py-2 relative ${isAdded ? "cursor-not-allowed bg-accent/20 border-accent pr-10" : ""} ${selected ? "bg-green-400/10 text-black border-green-400 cursor-pointer" : ""}`}
                  >
                    {getRoomTypeFeatures?.data?.map(
                      (feature) =>
                        feature.feature.id === f.id && (
                          <button
                            className="absolute right-1 top-1/2 -translate-y-1/2 bg-destructive/20 hover:bg-destructive/40 rounded-full p-1.5 cursor-pointer"
                            onClick={() =>
                              deleteRoomTypeFeatures.mutateAsync({
                                id: feature.id,
                              })
                            }
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
          <CardContent className="flex flex-col justify-center items-center">
            <img
              src="/No data-amico.svg"
              alt="no data"
              className="w-50 h-50 "
            />
              <span>داده ای وجود ندارد!</span>

          </CardContent>
        )}
        <CardPagination
          currentPage={currentRoomTypeFeaturePage}
          onPageChange={setCurrentRoomTypeFeaturePage}
          pageCount={roomTypeFeaturesPageCount}
        />
      </Card>
    </FormComponent>
    // <div className="sm:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-4xl ">
    //   <Form {...form}>
    //     <form onSubmit={form.handleSubmit(handleSubmit)}>

    //       <CustomButton type="submit" className="mt-5">ثبت</CustomButton>

    //       <div className="flex flex-col gap-5 items-start justify-start"></div>
    //     </form>
    //     <FormErrorModal
    //       open={errorOpen}
    //       message={errmessage}
    //       onOpenChange={setErrorOpen}
    //       onAcknowledge={() => setErrorOpen(false)}
    //     />
    //   </Form>
    // </div>
  );
};

export default RoomTypeFeatures;
