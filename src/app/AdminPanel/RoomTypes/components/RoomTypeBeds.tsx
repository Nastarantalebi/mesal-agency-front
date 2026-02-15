import { accommodation_url, beds_key, beds_url } from "@/data/querykeys";
import type { TPaginatedResponse } from "@/types";
import React, { useEffect, useState } from "react";

import useGetData from "@/services/useGetData";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import usePostData from "@/services/usePostData";
import { toast } from "sonner";
import { Form } from "@/components/ui/form";
import type { TBedResponse } from "../../Beds/types";
import FormErrorModal from "@/components/FormErrorModal";
import CustomButton from "@/components/form/CustomButton";
import type { TCRoomTypeBed, TRoomTypeBedResponse } from "../types";

interface Props {
  AccommodationId?: string;
  RoomId?: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
}

const bedListValidation = z.object({
  beds: z.array(z.number()).min(1, "حداقل یک نوع تخت را انتخاب کنید"),
});

const badListInitialValues = {
  beds: [],
};

type TBedListForm = z.infer<typeof bedListValidation>;

const RoomTypeBeds = ({
  AccommodationId,
  RoomId,
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

  const key = [beds_key, String(AccommodationId), String(RoomId)];
  const url = `${accommodation_url}${AccommodationId}/room_types/${RoomId}/beds/` 

  const { data: roomBedsData } = useGetData<TPaginatedResponse<TBedResponse>>({
    key: [beds_key],
    url: `${beds_url}`,
  });

  const { data: roomTypeBedList } = useGetData<TRoomTypeBedResponse>({
    key,
    url,
    enabled: !!RoomId
  });



  const submitBeds = usePostData<TCRoomTypeBed, TRoomTypeBedResponse>({
    key,
    url,
  });

  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const toggle = (id: number) => {
    setSelectedIds((prev) => {
      const newSelection = prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id];

      form.setValue("beds", newSelection, { shouldValidate: true });

      return newSelection;
    });
  };

  const handleSubmit = (values: TCRoomTypeBed) => {
    submitBeds.mutateAsync(
      { beds: values.beds },
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
                <Card className="shadow-lg shadow-primary/50 ">
                  {roomBedsData ? (
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {roomBedsData.results?.map((f) => {
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
                              {f.name}
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
                    تخت های اضافه شده
                  </CardTitle>

                  <CardContent className="flex flex-wrap gap-2">
                    {roomTypeBedList?.map((roomType) => {
                      return (
                        <Badge
                          key={roomType.id}
                          variant="primary"
                          className="px-6 py-2 bg-accent/70 text-black"
                        >
                          {roomType.bed.name}
                        </Badge>
                      );
                    })}
                  </CardContent>
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

export default RoomTypeBeds;
