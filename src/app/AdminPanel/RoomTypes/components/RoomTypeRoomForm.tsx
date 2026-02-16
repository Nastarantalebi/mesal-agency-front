import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  roomTypeRoomsInitialValues,
  roomTypeRoomValidation,
} from "../fixtures/Validation";
import type { TCRoomTypesRoom, TRoomTypeRoomResponse } from "../types";
import { toast } from "sonner";
import { RoomFields } from "../fixtures/RoomFields";
import formTypes from "@/components/form/formInputTypes";
import CustomButton from "@/components/form/CustomButton";
import { accommodation_url } from "@/data/querykeys";
import usePostData from "@/services/usePostData";
import useGetData from "@/services/useGetData";
import type { TPaginatedResponse } from "@/types";
import FormErrorModal from "@/components/FormErrorModal";
import { Form } from "@/components/ui/form";

interface Props {
  AccommodationId: string;
  RoomId: string | null;
}

const RoomTypeRoomForm = ({ AccommodationId, RoomId }: Props) => {
  const key = ["RoomType-rooms", RoomId || ""];
  const url = `${accommodation_url}${AccommodationId}/room_types/${RoomId}/rooms/`;

  const createRoom = usePostData<TCRoomTypesRoom, TRoomTypeRoomResponse>({
    key,
    url,
  });

  const { data: RoomList } = useGetData<
    TPaginatedResponse<TRoomTypeRoomResponse>
  >({
    key,
    url,
    enabled: !!RoomId,
  });




  const form = useForm<TCRoomTypesRoom>({
    resolver: zodResolver(roomTypeRoomValidation),
    defaultValues: roomTypeRoomsInitialValues,
  });

  const [errorOpen, setErrorOpen] = useState(false);
  const errmessage = "ثبت تخت با خطا مواجه شد، لطفاً دوباره تلاش کنید.";

  const handle = (value: TCRoomTypesRoom) => {
    createRoom.mutateAsync(value, {
      onSuccess: () => {
        toast.success("نوع تخت با موفقیت افزوده شد");
      },
      onError: () => setErrorOpen(true),
    });
  };
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handle)}>
          {RoomFields.map((item) => (
            <div
              key={String(item.name)}
              className={item.className || "col-span-1"}
            >
              {formTypes<TCRoomTypesRoom>(item, form.control)}
            </div>
          ))}
          <div className="col-span-1 md:col-span-2 lg:grid-cols-4 flex justify-start gap-3 mt-6">
            <CustomButton type="submit">افزودن</CustomButton>
          </div>
        </form>

        <FormErrorModal
          open={errorOpen}
          message={errmessage}
          onOpenChange={setErrorOpen}
          onAcknowledge={() => setErrorOpen(false)}
        />
      </Form>
    </div>
  );
};

export default RoomTypeRoomForm;
