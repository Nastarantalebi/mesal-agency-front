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

interface Props {
  AccommodationId?: string;
  RoomId?: number | null;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: string;
  buttonTitle?: string;
  asModal?: boolean;
}

const RoomTypeForm = ({
  AccommodationId,
  RoomId,
  asModal,
  open,
  onOpenChange: onOpenchange,
  title,
  buttonTitle,
}: Props) => {
  const form = useForm<TCreateRoomType>({
    resolver: zodResolver(roomTypeValidation),
    defaultValues: roomTypeInitialValues,
  });

  const key = ["RoomTypes", AccommodationId || "", String(RoomId) || ""];

  const { data, isFetching } = useGetData<TRoomTypeResponse>({
    key,
    url: `${accommodation_url}${AccommodationId}/room_types/${RoomId}`,
    enabled: !!RoomId,
  });

  const updateMutation = usePutData<TCreateRoomType, TRoomTypeResponse>({
    key,
    url: `${accommodation_url}${AccommodationId}/room_types/${RoomId}`,
  });

  const createMutation = usePostData<TCreateRoomType, TRoomTypeResponse>({
    key: ["RoomTypes", AccommodationId || ""],
    url: `${accommodation_url}${AccommodationId}/room_types/`,
  });

  useEffect(() => {
    if (!data) return;
    form.reset({
      ...roomTypeInitialValues,
      ...data,
    });
  }, [data]);

  const [errorOpen, setErrorOpen] = useState(false);
  const errmessage = "ثبت فرم با خطا مواجه شد، لطفاً دوباره تلاش کنید.";

  const handleSubmit = (value: TCreateRoomType) => {
    const isEdit = !!RoomId;

    if (isEdit) {
      updateMutation.mutateAsync(value, {
        onSuccess: () => {
          toast.success("ویرایش با موفقیت انجام شد ");
          onOpenchange?.(false);
        },
        onError: () => setErrorOpen(true),
      });
    } else {
      createMutation.mutateAsync(value, {
        onSuccess: () => {
          toast.success("نوع اتاق با موفقیت ثبت شد ");
          form.reset(roomTypeInitialValues);
        },
        onError: () => setErrorOpen(true),
      });
    }
  };

  if (isFetching) return <div className="p-4">Loading...</div>;

  const formContent = (
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
        <div className="mt-10">
          <CustomButton
            type="button"
            variant="outline"
            onClick={() => onOpenchange?.(false)}
          >
            انصراف
          </CustomButton>
          <CustomButton type="submit">{buttonTitle}</CustomButton>
        </div>
      </form>
    </Form>
  );
  if (asModal) {
    return (
      <>
        <Dialog open={open} onOpenChange={onOpenchange}>
          <DialogContent className="sm:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-4xl">
            <DialogHeader>
              <DialogTitle className="mb-6">{title}</DialogTitle>
            </DialogHeader>
            {formContent}
          </DialogContent>
        </Dialog>
        <FormErrorModal
          open={errorOpen}
          message={errmessage}
          onOpenChange={setErrorOpen}
          onAcknowledge={() => setErrorOpen(false)}
        />
      </>
    );
  }

  return (
    <>
      {formContent}
      <FormErrorModal
        open={errorOpen}
        message={errmessage}
        onOpenChange={setErrorOpen}
        onAcknowledge={() => setErrorOpen(false)}
      />
    </>
  );
};

export default RoomTypeForm;
