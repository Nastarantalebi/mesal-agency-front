import CustomButton from "@/components/form/CustomButton";
import FormErrorModal from "@/components/FormErrorModal";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { TCRoomTypeFeature, TRoomTypeFeatureListForm } from "../../types";
import { roomTypeFeatureListInitialValues, roomTypeFeatureListValidation } from "../../fixtures/Validation";
import { useRoomTypeFeatures } from "../../services/useRoomType";
import HandlePagination from "@/app/AdminPanel/settings/components/HandlePagination";

interface Props {
  AccommodationId: number;
  RoomTypeId?: number | null;
  RoomTypeName?: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
}

const RoomTypeFeatures = ({
  AccommodationId,
  RoomTypeId,
  open,
  onOpenChange,
  title,
  RoomTypeName,
}: Props) => {

  const form = useForm<TRoomTypeFeatureListForm>({
    resolver: zodResolver(roomTypeFeatureListValidation),
    defaultValues: roomTypeFeatureListInitialValues,
  });

  const [currentRoomTypeFeaturePage, setCurrentRoomTypeFeaturePage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const { getFeatures, getRoomTypeFeatures, postRoomTypeFeatures, deleteRoomTypeFeatures } = useRoomTypeFeatures(AccommodationId, RoomTypeId!, currentRoomTypeFeaturePage);
  
  const [errorOpen, setErrorOpen] = useState(false);
  const errmessage = "ثبت فرم با خطا مواجه شد، لطفاً دوباره تلاش کنید.";
  
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

      const resultSelection = Array.from(new Set([...newSelection, ...(allAddedFeaturesIds || [])]));

      form.setValue("feature", resultSelection, { shouldValidate: true });
      console.log(`new selection: ${newSelection}`);
      console.log(`result selection: ${resultSelection}`);
      return resultSelection;
    });
  };

  const handleSubmit = (values: TCRoomTypeFeature) => {
    postRoomTypeFeatures.mutateAsync(
      { feature: values.feature },
      {
        onSuccess: () => {
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
        <div className="bg-primary/20 p-2 rounded mb-3 text-center">{`نوع اتاق ${RoomTypeName}`}</div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="grid grid-cols-2 gap-10">
              <div className="flex flex-col gap-5 items-start justify-start">
                <Card className="shadow-lg shadow-primary/50">
                  <CardTitle className="text-center text-sm font-light mr-5">
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
                              onClick={() => {!isAdded && toggle(f.id)}}
                              className={`px-6 py-2 ${isAdded ? "bg-accent/20 border-accent" : ""} ${selected ? "bg-green-400/10 text-black border-green-400 cursor-pointer" : ""}`

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
                  <HandlePagination
                    currentPage={currentRoomTypeFeaturePage}
                    onPageChange={setCurrentRoomTypeFeaturePage}
                    pageCount={roomTypeFeaturesPageCount}
                  />
                </Card>
                <CustomButton type="submit">ثبت</CustomButton>
              </div>
              <div className="flex flex-col gap-5 items-start justify-start">
                <Card className="shadow-lg shadow-primary/50">
                  <CardTitle className="text-center text-sm font-light mx-5">
                    ویژگی های اضافه شده
                  </CardTitle>
                  {getRoomTypeFeatures.data?.length ? (
                    <CardContent className="p-5">
                      <div className="flex flex-wrap gap-2">
                        {getRoomTypeFeatures.data?.map((f) => {
                          return (
                            <Badge
                              key={f.id}
                              variant="primary"
                              className="px-6 py-2 bg-accent/70 text-black relative pr-10"
                            >
                              {f.feature.title}
                              <button
                                type="button"
                                onClick={() => {deleteRoomTypeFeatures.mutateAsync({ id: f.id }); setSelectedIds(selectedIds.filter((id) => id !== f.id));}
                                  
                                }
                                className="absolute right-1 top-1/2 -translate-y-1/2 bg-destructive/20 hover:bg-destructive/40 rounded-full p-1.5 cursor-pointer"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </Badge>
                          );
                        })}
                      </div>
                    </CardContent>
                  ) : (
                    <CardContent className="p-5">
                      هیچ ویژگی اضافه نشده است. از لیست سمت راست اضافه کنید.
                    </CardContent>
                  )}
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
