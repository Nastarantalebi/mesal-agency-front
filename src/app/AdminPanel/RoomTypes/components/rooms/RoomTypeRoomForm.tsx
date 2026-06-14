import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  roomTypeRoomsInitialValues,
  roomTypeRoomValidation,
} from "../../fixtures/Validation";
import { useRooms } from "../../services/useRoomType";
import type { Props, TCRoomTypesRoom } from "../../types";
import FormComponent from "@/_components/Form/Form";
import { RoomFields } from "../../fixtures/RoomFields";

const RoomTypeRoomForm = ({ AccommodationId, RoomTypeId }: Props) => {

  const { postRoom,ispendingPost } = useRooms(AccommodationId, RoomTypeId!);

  const form = useForm<TCRoomTypesRoom>({
    resolver: zodResolver(roomTypeRoomValidation),
    defaultValues: roomTypeRoomsInitialValues,
  });

  const handleSubmit = (value: TCRoomTypesRoom) => {
    postRoom(value, {
      onSuccess: () => {
        form.reset(roomTypeRoomsInitialValues);
      },
    });
  };
  return (

          <FormComponent<TCRoomTypesRoom>
      onSubmit={(value) => handleSubmit(value)}
      form={form}
      isSubmitting={ispendingPost}
      formFields={RoomFields}
    />


 
  );
};

export default RoomTypeRoomForm;
