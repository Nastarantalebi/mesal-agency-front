import CustomButton from "@/components/form/CustomButton";
import formTypes from "@/components/form/formInputTypes";
import FormErrorModal from "@/components/form/FormErrorModal";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { RoomFields } from "../../fixtures/RoomFields";
import {
  roomTypeRoomsInitialValues,
  roomTypeRoomValidation,
} from "../../fixtures/Validation";
import { useRooms } from "../../services/useRoomType";
import type { Props, TCRoomTypesRoom } from "../../types";

const RoomTypeRoomForm = ({ AccommodationId, RoomTypeId }: Props) => {

  const { postRoom } = useRooms(AccommodationId, RoomTypeId!);

  const form = useForm<TCRoomTypesRoom>({
    resolver: zodResolver(roomTypeRoomValidation),
    defaultValues: roomTypeRoomsInitialValues,
  });

  const [errorOpen, setErrorOpen] = useState(false);
  const errmessage = "ثبت اتاق با خطا مواجه شد، لطفاً دوباره تلاش کنید.";

  const handle = (value: TCRoomTypesRoom) => {
    postRoom.mutateAsync(value, {
      onSuccess: () => {
        form.reset(roomTypeRoomsInitialValues);
      },
      onError: () => {setErrorOpen(true)},
    });
  };
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handle)}>
          {RoomFields.map((item) => (
            <div
              key={String(item.name)}
              className={item.className || "col-span-1 mb-4"}
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
