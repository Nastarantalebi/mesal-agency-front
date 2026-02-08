import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  roomTypeInitialValues,
  roomTypeValidation,
} from "../fixtures/Validation";
import type { TCreateRoomType, TRoomTypeResponse } from "../types";
import useGetData from "@/services/useGetData";
import { accommodation_url } from "@/data/querykeys";
import { useEffect, useState } from "react";
import usePostData from "@/services/usePostData";
import usePutData from "@/services/usePutData";
import { toast } from "sonner";
import { RoomFields } from "../fixtures/RoomTypesFields";
import { FieldGroup } from "@/components/ui/field";
import formTypes from "../../../../components/form/formInputTypes";
import FormErrorModal from "@/components/FormErrorModal";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CustomButton from "@/components/form/CustomButton";
import { Form } from "@/components/ui/form";

// interface Props {
//   title: string;
//   open: boolean;
//   onOpenchange: (open: boolean) => void;
//   fields: Items<TCreateRoomType>[];
// }

interface Props {
  AccommodationId?: string;
  RoomId?: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
}

const RoomTypeForm = ({
  AccommodationId,
  RoomId,
  open,
  onOpenChange: onOpenchange,
  title,
}: Props) => {
  const form = useForm<TCreateRoomType>({
    resolver: zodResolver(roomTypeValidation),
    defaultValues: roomTypeInitialValues,
  });

  const { data, isFetching } = useGetData<TRoomTypeResponse>({
    key: ["RoomTypes", String(AccommodationId), String(RoomId)],
    url: `${accommodation_url}${AccommodationId}/room_types/${RoomId}`,
    enabled: !!RoomId,
  });

  useEffect(() => {
    if (!data) return;
    form.reset({
      ...data,
    });
  }, [data]);

  const createMutation = usePostData<TCreateRoomType, TRoomTypeResponse>({
    key: ["RoomTypes"],
    url: `${accommodation_url}${AccommodationId}/room_types/`,
  });

  const updateMutation = usePutData<TCreateRoomType, TRoomTypeResponse>({
    key: ["RoomTypes", AccommodationId, String(RoomId)],
    url: `${accommodation_url}${AccommodationId}/room_types/${RoomId}`,
  });

  const [errorOpen, setErrorOpen] = useState(false);
  const errmessage = "ثبت فرم با خطا مواجه شد، لطفاً دوباره تلاش کنید.";

  const handleSubmit = (value: TCreateRoomType) => {
    const isEdit = !!RoomId;

    if (isEdit) {
      updateMutation.mutateAsync(value, {
        onSuccess: () => {
          toast.success("ویرایش با موفقیت انجام شد ✅");
        },
        onError: () => setErrorOpen(true),
      });
    } else {
      createMutation.mutateAsync(value, {
        onSuccess: () => {
          toast.success("اقامتگاه با موفقیت ثبت شد ✅");
          form.reset(roomTypeInitialValues);
        },
        onError: () => setErrorOpen(true),
      });
    }
  };
  console.log(form.watch());

  if (isFetching) return <div className="p-4">Loading...</div>;

  return (
    <Dialog open={open} onOpenChange={onOpenchange}>
      <DialogContent className="sm:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-4xl ">
        <DialogHeader>
          <DialogTitle className="mb-6">{title}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <FieldGroup>
              {RoomFields.map((item) => (
                <div
                  key={String(item.name)}
                  className={item.className || "col-span-1"}
                >
                  {formTypes<TCreateRoomType>(item, form.control)}
                </div>
              ))}
            </FieldGroup>
            <DialogFooter className="mt-6">
              <DialogClose asChild>
                <CustomButton type="button" variant="outline">
                  انصراف
                </CustomButton>
              </DialogClose>
              <CustomButton type="submit">ثبت</CustomButton>
            </DialogFooter>

          </form>
        </Form>
      </DialogContent>
      <FormErrorModal
        open={errorOpen}
        message={errmessage}
        onOpenChange={setErrorOpen}
        onAcknowledge={() => setErrorOpen(false)}
      />
    </Dialog>
  );
};

export default RoomTypeForm;
