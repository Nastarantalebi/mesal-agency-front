import type { ColumnDef } from "@tanstack/react-table";
import type { TRoomTypeRoomResponse } from "../types";
import { accommodation_url } from "@/data/querykeys";
import type { TPaginatedResponse } from "@/types";
import useGetData from "@/services/useGetData";
import { CustomDataTable } from "@/components/list/CustomDataTable";
import { id } from "zod/v4/locales";
import ListDelete from "./ListDelete";
import { useState } from "react";
import FormErrorModal from "@/components/FormErrorModal";
import useDeleteData from "@/services/useDeleteData";
import { toast } from "sonner";

export const columns: ColumnDef<TRoomTypeRoomResponse>[] = [
  { accessorKey: "name", header: "نام اتاق" },
  {
    id: "floor",
    header: "طبقه",
    accessorFn: (row) => row.floor ?? "",
  },
  {
    id: "description",
    header: "توضیحات",
    accessorFn: (row) => row.description ?? "",
  },
];

interface Props {
  AccommodationId: string;
  RoomId: string | null;
}
const RoomTypeRoomList = ({ AccommodationId, RoomId }: Props) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [openDelete, setOpenDelete] = useState(false);

  const key = ["RoomType-rooms", RoomId || ""];
  const url = `${accommodation_url}${AccommodationId}/room_types/${RoomId}/rooms/`;
  const deleteMessage = "آیا از حذف آیتم اطمینان دارید؟";

  const { data, isLoading, error } = useGetData<
    TPaginatedResponse<TRoomTypeRoomResponse>
  >({
    key,
    url,
  });
    const { mutateAsync: deleteRoom } = useDeleteData({
    key,
    url,
  });

  const handleDelete = async (id: number) => {
    try {
      await deleteRoom({ id });
      toast.success("آیتم با موفقیت حذف شد");
    } catch (error) {
      toast.error("خطا در حذف آیتم");
    }
  };



  if (isLoading) return <div>Loading...</div>;
  if (error) return <div className="text-red-600">{String(error)}</div>;

  return (
    <div>
      <CustomDataTable
        columns={columns}
        showAction={true}
        data={data?.results ?? []}
        placeholder="جست و جوی نام اتاق"
        extraAction={(id) => (
          <ListDelete
            id={id}
            onClick={(id) => {
              setSelectedId(id);
              setOpenDelete(true);
            }}
          />
        )}
      />
      <FormErrorModal
        open={openDelete}
        onOpenChange={() => setOpenDelete(false)}
        message={deleteMessage}
        buttonTitle="بله"
        dialogTitle= "حذف"
        onAcknowledge={() => handleDelete(Number(selectedId))}
      />
    </div>
  );
};

export default RoomTypeRoomList;
