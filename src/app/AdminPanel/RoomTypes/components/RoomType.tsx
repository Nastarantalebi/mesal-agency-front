import CustomButton from "@/components/form/CustomButton";
import { Plus } from "lucide-react";
import { useState } from "react";
import RoomTypeForm from "./RoomTypeForm";
import RoomList from "./RoomTypeList";

const roomType = ({ accommodationId }: { accommodationId: string }) => {
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
          افزودن اتاق
        </CustomButton>
        <RoomTypeForm
          AccommodationId={accommodationId}
          open={open}
          onOpenChange={setOpen}
          title="افزودن نوع اتاق جدید"
        />
        <RoomList AccommodationId={accommodationId} />
      </main>
    </div>
  );
};

export default roomType;
