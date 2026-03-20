import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FormErrorModal from "@/components/form/FormErrorModal";
import CustomButton from "@/components/form/CustomButton";
import { badListInitialValues, bedListValidation, type TBedListForm } from "../../../fixtures/Validation";
import { useRoomTypeBed } from "../../../services/useRoomType";
import type { Props, TCRoomTypeBed } from "../../../types";
import BedButtonTemplate from "./BedButtonTemplate";


const RoomTypeBeds = ({
  AccommodationId,
  RoomTypeId,
  RoomTypeName,
  open,
  onOpenChange,
  title,
}: Props) => {
  const form = useForm<TBedListForm>({
    resolver: zodResolver(bedListValidation),
    defaultValues: badListInitialValues,
  });

  const [errorOpen, setErrorOpen] = useState(false);
  const errmessage = "ثبت فرم با خطا مواجه شد، لطفاً دوباره تلاش کنید.";

  const [bedCounts, setBedCounts] = useState<Record<number, number>>({});

  const { getbeds, getRoomTypeBeds, postRoomTypeBeds } = useRoomTypeBed(AccommodationId, RoomTypeId!);

  useEffect(() => {
    if (!getRoomTypeBeds.data || !open) return;

    const counts: Record<number, number> = {};
    getRoomTypeBeds.data.forEach((item) => {
      counts[Number(item.bed.id)] = item.number; // 👈 convert string to number
    });

    setBedCounts(counts);
    form.setValue("beds", buildBedPayload(counts), { shouldValidate: true });
  }, [getRoomTypeBeds.data, open]);

  const handleSubmit = (values: TCRoomTypeBed) => {
    console.log(values);
    postRoomTypeBeds.mutateAsync(
      { beds: values.beds },
      {
        onSuccess: () => {
          onOpenChange?.(false);
          form.reset();
          setBedCounts([]);
        },
        onError: () => setErrorOpen(true),
      },
    );
  };

  // Reset state when dialog closes
  useEffect(() => {
    if (!open) {
      form.reset();
      setBedCounts({});
    }
  }, [open, form]);

  const buildBedPayload = (counts: Record<number, number>) => {
    return Object.entries(counts)
      .filter(([, count]) => count > 0)
      .map(([id, count]) => ({ bed: Number(id), number: count }));
  };

  const handleAdd = (id: number) => {
    setBedCounts((prev) => {
      const updated = { ...prev, [id]: (prev[id] ?? 0) + 1 };
      form.setValue("beds", buildBedPayload(updated), { shouldValidate: true });
      return updated;
    });
  };

  const handleRemove = (id: number) => {
    setBedCounts((prev) => {
      const newCount = Math.max(0, (prev[id] ?? 0) - 1);
      const updated = { ...prev, [id]: newCount };
      form.setValue("beds", buildBedPayload(updated), { shouldValidate: true });
      return updated;
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-4xl">
        <DialogHeader>
          <DialogTitle className="mb-6">{title}</DialogTitle>
        </DialogHeader>
        <div className="bg-primary/20 p-2 rounded mb-3 text-center">{`نوع اتاق ${RoomTypeName}`}</div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="grid grid-cols-1 gap-10">
              <div className="flex flex-col gap-5 items-start justify-start">
                <Card className="shadow-lg shadow-primary/50 grid grid-cols-1">
                  {getRoomTypeBeds.isFetching ? (
                    <CardContent>در حال بارگذاری...</CardContent>
                  ) : getbeds.data ? (
                    <CardContent>
                        {getbeds.data.results?.map((f) => (
                          <BedButtonTemplate
                            key={f.id}
                            buttonName={f.name}
                            count={bedCounts[f.id] ?? 0}
                            onAdd={() => handleAdd(f.id)}
                            onRemove={() => handleRemove(f.id)}
                          />
                        ))}
                    </CardContent>
                  ) : (
                    <CardContent>داده ای برای نمایش وجود ندارد</CardContent>
                  )}
                </Card>
                <CustomButton type="submit">ثبت</CustomButton>
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

export default RoomTypeBeds;


