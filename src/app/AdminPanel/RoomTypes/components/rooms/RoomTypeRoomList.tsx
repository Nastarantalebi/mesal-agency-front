import FormErrorModal from "@/components/form/FormErrorModal";
import { CustomDataTable } from "@/components/list/CustomDataTable";
import ListPagination from "@/components/list/ListPagination";
import type { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { useRoomList } from "../../services/useRoomType";
import type { Props, TRoomTypeRoomResponse } from "../../types";
import ListDelete from "../roomTypeListIcons/ListDelete";
import SearchInput from "@/components/list/SearchInput";

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
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [ input, setInput ] = useState("");

  const deleteMessage = "آیا از حذف آیتم اطمینان دارید؟";

  const { getRooms, deleteRoom } = useRoomList(AccommodationId, RoomTypeId!, currentPage, searchInput);

  const handleDelete = async (id: number) => {
    await deleteRoom.mutateAsync({ id });
  };

  if (getRooms.isFetching) return <div>Loading...</div>;
  if (getRooms.error) return <div className="text-red-600">{String(getRooms.error.message)}</div>;

  const PageCount = getRooms.data?.count ? Math.ceil(getRooms.data.count / 10) : 0;

  return (
    <>
      <SearchInput input={input} setInput={setInput} setSearchInput={setSearchInput} placeholder="جست و جوی نام اتاق"/>
      <CustomDataTable
        columns={columns}
        showAction={true}
        data={getRooms.data?.results ?? []}
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
        onAcknowledge={() => handleDelete(selected?.id!)}
      />
    </>
  );
};

export default RoomTypeRoomList;
