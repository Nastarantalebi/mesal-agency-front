import RoomList from "@/app/AdminPanel/RoomTypes/components/RoomTypeList";
import CustomButton from "@/components/form/CustomButton";
import RoomTypeForm from "@/app/AdminPanel/RoomTypes/components/RoomTypeForm";
import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/admin-panel/$id/roomTypes")({
  component: RoomTypes,
});

function RoomTypes() {
  const { id } = Route.useParams();
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
          AccommodationId={id}
          open={open}
          onOpenChange={setOpen}
          title="افزودن نوع اتاق جدید"
        />
        <RoomList AccommodationId={id} />
      </main>
    </div>
  );
}
