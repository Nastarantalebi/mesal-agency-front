import CustomButton from "@/components/form/CustomButton";
import FormErrorModal from "@/components/FormErrorModal";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FieldGroup } from "@/components/ui/field";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import formTypes from "../../../../components/form/formInputTypes";
import { RoomFields } from "../fixtures/RoomTypesFields";
import {
  roomTypeInitialValues,
  roomTypeValidation,
} from "../fixtures/Validation";
import { useRoomType } from "../services/useRoomType";
import type { TCreateRoomType } from "../types";

interface Props {
  AccommodationId?: number;
  RoomTypeId?: number | null;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: string;
  buttonTitle?: string;
  asModal?: boolean;
}

const RoomTypeForm = ({
  AccommodationId,
  RoomTypeId,
  asModal,
  open,
  onOpenChange: onOpenchange,
  title,
  buttonTitle,
}: Props) => {
  
  const { getRoomType, putRoomType, postRoomType } = useRoomType(AccommodationId, RoomTypeId!)

  const form = useForm<TCreateRoomType>({
    resolver: zodResolver(roomTypeValidation),
    defaultValues: roomTypeInitialValues,
  });


  useEffect(() => {
    if (!getRoomType.data) return;
    form.reset({
      ...roomTypeInitialValues,
      ...getRoomType.data,
    });
  }, [getRoomType.data]);

  const [errorOpen, setErrorOpen] = useState(false);
  const errmessage = "ثبت فرم با خطا مواجه شد، لطفاً دوباره تلاش کنید.";

  const handleSubmit = (value: TCreateRoomType) => {
    const isEdit = !!RoomTypeId;

    if (isEdit) {
      putRoomType.mutateAsync(value, {
        onSuccess: () => {
          onOpenchange?.(false);
        },
        onError: () => setErrorOpen(true),
      });
    } else {
      postRoomType.mutateAsync(value, {
        onSuccess: () => {
          form.reset(roomTypeInitialValues);
          onOpenchange?.(false);
        },
        onError: () => setErrorOpen(true),
      });
    }
  };

  if (getRoomType.isFetching) return <div className="p-4">Loading...</div>;

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
