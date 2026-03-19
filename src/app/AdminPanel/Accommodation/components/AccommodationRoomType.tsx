import CustomButton from "@/components/form/CustomButton";
import { Plus } from "lucide-react";
import { useState } from "react";
import RoomTypeList from "../../RoomTypes/components/roomType/RoomTypeList";
import RoomTypeForm from "../../RoomTypes/components/roomType/RoomTypeForm";
import type { Props } from "../types";

const roomType = ({ AccommodationId }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex justify-center">
      <main className=" max-w-5xl flex-1 min-w-0 overflow-x-hidden p-20">
        <CustomButton
          icon={<Plus className="h-5 w-5" />}
          iconPosition="right"
          onClick={() => {
            setOpen(true);
          }}
        >
          افزودن نوع اتاق جدید
        </CustomButton>
        <RoomTypeForm
          AccommodationId={AccommodationId}
          open={open}
          onOpenChange={setOpen}
          title="افزودن نوع اتاق جدید"
          buttonTitle="ثبت"
        />
        <RoomTypeList AccommodationId={AccommodationId} />
      </main>
    </div>
  );
};

export default roomType;
