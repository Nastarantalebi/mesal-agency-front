import FormErrorModal from "@/components/form/FormErrorModal";
import { CustomDataTable } from "@/components/list/CustomDataTable";
import type { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { useRoomList } from "../../services/useRoomType";
import type { Props, TRoomTypeRoomResponse } from "../../types";
import ListDelete from "../roomTypeListIcons/ListDelete";
import { initialValue } from "@/types";

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

const RoomTypeRoomList = ({ AccommodationId, RoomTypeId }: Props) => {
  const [selected, setSelected] = useState<TRoomTypeRoomResponse | null>(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [search, setSearch] = useState("");

  const deleteMessage = "آیا از حذف آیتم اطمینان دارید؟";

  const { getRooms, deleteRoom } = useRoomList(
    AccommodationId,
    RoomTypeId!,
    search,
  );

  const handleDelete = async (id: number) => {
    await deleteRoom.mutateAsync({ id });
  };

  if (getRooms.isFetching) return <div>Loading...</div>;
  if (getRooms.error)
    return <div className="text-red-600">{String(getRooms.error.message)}</div>;
  return (
    <>
      <CustomDataTable
        searchValue={search}
        onSearchChange={setSearch}
        onSearch={(value) => {
          setSearch(value);
        }}
        searchPlaceHolder="جست و جوی نام تور"
        columns={columns}
        showAction={true}
        data={getRooms.data ?? initialValue}
        extraAction={(rowData) => (
          <ListDelete
            onClick={() => {
              setSelected(rowData);
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
        dialogTitle="حذف"
        onAcknowledge={() => handleDelete(selected?.id!)}
      />
    </>
  );
};

export default RoomTypeRoomList;
