import {
  accommodation_url,
  features_key,
  features_url,
} from "@/data/querykeys";
import type { TPaginatedResponse } from "@/types";
import React, { useEffect, useState } from "react";
import type {


  TFeatureResponse,
} from "../../AccommodationFeatures/types";
import useGetData from "@/services/useGetData";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CustomButton from "@/components/form/CustomButton";
import usePostData from "@/services/usePostData";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Form } from "@/components/ui/form";
import FormErrorModal from "@/components/FormErrorModal";
import type { TCRoomTypeFeature, TRoomTypeFeatureResponse } from "../types";

interface Props {
  AccommodationId?: string;
  RoomId?: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
}

const featureListValidation = z.object({
  feature: z.array(z.number()).min(1, "لطفاً حداقل یک ویژگی را انتخاب کنید"),
});

const featureListInitialValues = {
  feature: [],
};

type TFeatureListForm = z.infer<typeof featureListValidation>;

const RoomTypeFeatures = ({
  AccommodationId,
  RoomId,
  open,
  onOpenChange,
  title,
}: Props) => {
  const form = useForm<TFeatureListForm>({
    resolver: zodResolver(featureListValidation),
    defaultValues: featureListInitialValues,
  });

  const [errorOpen, setErrorOpen] = useState(false);
  const errmessage = "ثبت فرم با خطا مواجه شد، لطفاً دوباره تلاش کنید.";

  const key = [features_key, String(AccommodationId), String(RoomId)];
  const url = `${accommodation_url}${AccommodationId}/room_types/${RoomId}/features/`

  const { data: roomTypeFeaturesData } = useGetData<
    TPaginatedResponse<TFeatureResponse>
  >({
    key: [features_key],
    url: `${features_url}?type=roomtype`,
  });

  const { data: roomTypeFeatureList } = useGetData<TRoomTypeFeatureResponse>({
    key,
    url,
    enabled: !!RoomId,
  });

  console.log((roomTypeFeatureList))

  const submitFeatures = usePostData<
    TCRoomTypeFeature,
    TRoomTypeFeatureResponse
  >({
    key,
    url,
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

  const handleSubmit = (values: TCRoomTypeFeature) => {
    submitFeatures.mutateAsync(
      { feature: values.feature },
      {
        onSuccess: () => {
          toast.success("ویژگی‌ها با موفقیت ثبت شد");
          onOpenChange(false);
          form.reset();
          setSelectedIds([]);
        },
        onError: () => setErrorOpen(true),
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-4xl ">
        <DialogHeader>
          <DialogTitle className="mb-6">{title}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="grid grid-cols-2 gap-10">
              <div className="flex flex-col gap-5 items-start justify-start">
                <Card className="shadow-lg shadow-primary/50">
                  <CardTitle className="text-center text-sm font-light">
                    ویژگی های مربوط به اتاق
                  </CardTitle>
                  {roomTypeFeaturesData ? (
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {roomTypeFeaturesData.results?.map((f) => {
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
              <div className="flex flex-col gap-5 items-start justify-start">
                <Card className="shadow-lg shadow-primary/50">
                  <CardTitle className="text-center text-sm font-light">
                    ویژگی های اضافه شده
                  </CardTitle>
                  <div>
                    <CardContent className="flex flex-wrap gap-2">
                      {roomTypeFeatureList?.map((f) => {
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
              </div>
            </div>
          </form>
          <FormErrorModal
            open={errorOpen}
            message={errmessage}
            onOpenChange={setErrorOpen}
            onAcknowledge={() => setErrorOpen(false)}
          />
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default RoomTypeFeatures;
