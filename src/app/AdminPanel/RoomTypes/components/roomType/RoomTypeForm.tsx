import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, type Dispatch, type SetStateAction } from "react";
import { useForm } from "react-hook-form";
import type { TCreateRoomType } from "../../types";
import { useRoomType } from "../../services/useRoomType";
import {
  roomTypeInitialValues,
  roomTypeValidation,
} from "../../fixtures/Validation";
import { RoomTypeFields } from "../../fixtures/RoomTypesFields";
import FormComponent from "@/_components/Form/Form";

interface Props {
  AccommodationId?: number;
  RoomTypeId?: number | null;
  setOpenModal?: Dispatch<SetStateAction<boolean>>;
}

const RoomTypeForm = ({
  AccommodationId,
  RoomTypeId,
  setOpenModal,
}: Props) => {
  const { getRoomType, putRoomType, ispendingPut, postRoomType, ispendingPost } = useRoomType(
    AccommodationId,
    RoomTypeId!,
  );

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

  const handleSubmit = (value: TCreateRoomType) => {
    const isEdit = !!RoomTypeId;

    if (isEdit) {
      putRoomType(
        { data: value, id: RoomTypeId },
        {
          onSuccess: () => {
            setOpenModal?.(false);
          },
        },
      );
    } else {
      postRoomType(value, {
        onSuccess: () => {
          form.reset(roomTypeInitialValues);
          setOpenModal?.(false);
        },
      });
    }
  };

  if (getRoomType.isFetching) return <div className="p-4">Loading...</div>;

  return (
    <FormComponent<TCreateRoomType>
      onSubmit={(value) => handleSubmit(value)}
      form={form}
      isSubmitting={ispendingPut || ispendingPost}
      formFields={RoomTypeFields}
    />
  );
};

export default RoomTypeForm;
