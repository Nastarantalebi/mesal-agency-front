import { accommodation_url, beds_key, beds_url } from "@/data/querykeys";
import type { TPaginatedResponse } from "@/types";
import { useEffect, useState } from "react";

import useGetData from "@/services/useGetData";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import usePostData from "@/services/usePostData";
import { toast } from "sonner";
import { Form } from "@/components/ui/form";

import FormErrorModal from "@/components/FormErrorModal";
import CustomButton from "@/components/form/CustomButton";
import BedButtonTemplate from "./BedButtonTemplate";
import {
  badListInitialValues,
  bedListValidation,
  type TBedListForm,
} from "../Fixtures/validation";
import type { TCRoomTypeBed, TRoomTypeBedResponse } from "../types";
import type { TBedResponse } from "@/app/AdminPanel/settings/types";

interface Props {
  AccommodationId?: string;
  RoomId?: number | null;
  RoomName?: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
}

const RoomTypeBeds = ({
  AccommodationId,
  RoomId,
  RoomName,
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

  const key = [beds_key, String(AccommodationId), String(RoomId)];
  const url = `${accommodation_url}${AccommodationId}/room_types/${RoomId}/beds/`;

  const { data: roomBedsData } = useGetData<TPaginatedResponse<TBedResponse>>({
    key: [beds_key],
    url: `${beds_url}`,
  });

  const { data: roomTypeBedList, isLoading: isLoadingRoomBeds } =
    useGetData<TRoomTypeBedResponse>({
      key,
      url,
      enabled: !!RoomId,
    });

  const submitBeds = usePostData<TCRoomTypeBed, TRoomTypeBedResponse>({
    key,
    url,
  });

  useEffect(() => {
    if (!roomTypeBedList || !open) return;

    const counts: Record<number, number> = {};
    roomTypeBedList.forEach((item) => {
      counts[Number(item.bed.id)] = item.number; // 👈 convert string to number
    });

    setBedCounts(counts);
    form.setValue("beds", buildBedPayload(counts), { shouldValidate: true });
  }, [roomTypeBedList, open]);

  const handleSubmit = (values: TCRoomTypeBed) => {
    console.log(values);
    submitBeds.mutateAsync(
      { beds: values.beds },
      {
        onSuccess: () => {
          toast.success("ویژگی‌ها با موفقیت ثبت شد");
          onOpenChange(false);
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
      <DialogContent className="sm:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-4xl ">
        <DialogHeader>
          <DialogTitle className="mb-6">{title}</DialogTitle>
        </DialogHeader>
        <div className="bg-primary/20 p-2 rounded mb-3 text-center">{`نوع اتاق ${RoomName}`}</div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="grid grid-cols-2 gap-10">
              <div className="flex flex-col gap-5 items-start justify-start">
                <Card className="shadow-lg shadow-primary/50 grid grid-cols-3 ">
                  {isLoadingRoomBeds ? (
                    <CardContent>در حال بارگذاری...</CardContent>
                  ) : roomBedsData ? (
                    <CardContent>
                      <div className="flex flex-col gap-2 flex-wrap">
                        {roomBedsData.results?.map((f) => (
                          <BedButtonTemplate
                            key={f.id}
                            buttonName={f.name}
                            count={bedCounts[f.id] ?? 0}
                            onAdd={() => handleAdd(f.id)}
                            onRemove={() => handleRemove(f.id)}
                          />
                        ))}
                      </div>
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
