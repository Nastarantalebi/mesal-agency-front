import type { ColumnDef } from "@tanstack/react-table";
import { accommodation_url } from "@/data/querykeys";
import type { TPaginatedResponse } from "@/types";
import useGetData from "@/services/useGetData";
import { CustomDataTable } from "@/components/list/CustomDataTable";
import { useState } from "react";
import FormErrorModal from "@/components/FormErrorModal";
import useDeleteData from "@/services/useDeleteData";
import { toast } from "sonner";
import ListPagination from "@/components/list/ListPagination";
import type { TRoomTypeRoomResponse } from "../../types";
import ListDelete from "../roomTypeListIcons/ListDelete";

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
  AccommodationId: number;
  RoomId?: number | null;
}
const RoomTypeRoomList = ({ AccommodationId, RoomId }: Props) => {
  const [selected, setSelected] = useState<TRoomTypeRoomResponse | null>(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const key = ["RoomType-rooms", String(RoomId) || "", String(currentPage)];
  const url = `${accommodation_url}${AccommodationId}/room_types/${RoomId}/rooms/?page=${currentPage}`;
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
    await deleteRoom({ id });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div className="text-red-600">{String(error)}</div>;

  const PageCount = data?.count ? Math.ceil(data.count / 10) : 0;

  return (
    <div className="">
      <CustomDataTable
        columns={columns}
        showAction={true}
        data={data?.results ?? []}
        placeholder="جست و جوی نام اتاق"
        extraAction={(rowData) => (
          <ListDelete
            onClick={() => {
              setSelected(rowData);
              setOpenDelete(true);
            }}
          />
        )}
      />
      <div className="mt-7">
        <ListPagination
          pageCount={PageCount}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
      <FormErrorModal
        open={openDelete}
        onOpenChange={() => setOpenDelete(false)}
        message={deleteMessage}
        buttonTitle="بله"
        dialogTitle="حذف"
        onAcknowledge={() => handleDelete(Number(selected))}
      />
    </div>
  );
};

export default RoomTypeRoomList;
