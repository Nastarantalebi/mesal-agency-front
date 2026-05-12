import FormErrorModal from "@/components/form/FormErrorModal";
import { CustomDataTable } from "@/components/list/CustomDataTable";
import type { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { useRoomTypeList } from "../../services/useRoomType";
import type { Props, RoomItem } from "../../types/index";
import RoomTypeForm from "./RoomTypeForm";
import ListDelete from "../roomTypeListIcons/ListDelete";
import ListPagination from "@/components/list/ListPagination";
import { useNavigate } from "@tanstack/react-router";

export const columns: ColumnDef<RoomItem>[] = [
  {
    id: "name",
    header: "نوع اتاق",
    accessorFn: (row) => row.name ?? "",
    size: 100,
  },
];

const RoomTypeList = ({ AccommodationId }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const { getRoomTypeList, deleteRoomType } = useRoomTypeList(
    AccommodationId,
    currentPage,
    search,
  );

  const [selected, setSelected] = useState<RoomItem | null>(null);

  const [openAdd, setAddRoomType] = useState(false);
  const [openD, setopenD] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async (id: number) => {
    await deleteRoomType.mutateAsync({ id });
  };

  const PageCount = getRoomTypeList.data?.count
    ? Math.ceil(getRoomTypeList.data.count / 10)
    : 0;

  if (getRoomTypeList.isFetching) return <div>Loading...</div>;
  if (getRoomTypeList.error)
    return <div className="text-red-600">{getRoomTypeList.error.message}</div>;

  const deleteMessage = "آیا از حذف آیتم اطمینان دارید؟";

  return (
    <>
      <div className="px-2 sm:px-0">
        {/* <Button
          variant={"outline"}
          className="mb-5 border-green-600 text-green-600 hover:bg-green-50 hover:text-green-600 w-full sm:w-auto"
          // ⭐ button full-width on mobile
          onClick={() => {
            setAddRoomType(true);
          }}
        >
          <Plus />
          افزودن نوع اتاق جدید
        </Button> */}

        <div className="overflow-x-auto rounded-md mt-4">
          <CustomDataTable
          searchValue={search}
            onSearchChange={setSearch}
            onSearch={(value) => {
              setCurrentPage(1);
              setSearch(value);
            }}
            searchPlaceHolder="جست و جوی نوع اتاق"

            onRowClick={(rowData) => {
              navigate({
                to: "/accommodation/$id/listRoomTypes/$roomTypeId",
                params: {
                  id: String(AccommodationId),
                  roomTypeId: String(rowData.id),
                },
              });
            }}
            onAdd={() => setAddRoomType(true)}
            customAddText="افزودن نوع اتاق جدید"
            extraAction={(rowData) => (
              <div className="flex flex-wrap gap-1 sm:gap-2 justify-center">
                <ListDelete
                  onClick={() => {
                    setSelected(rowData);
                    setopenD(true);
                  }}
                />
              </div>
            )}
            showAction={true}
            columns={columns}
            data={getRoomTypeList.data?.results ?? []}
          />
        </div>

        <div className="mt-7 flex justify-center">
          <ListPagination
            pageCount={PageCount}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      <RoomTypeForm
        AccommodationId={AccommodationId}
        open={openAdd}
        onOpenChange={() => setAddRoomType(false)}
        title="افزودن نوع اتاق جدید"
        buttonTitle="ثبت"
        asModal={true}
      />
      <FormErrorModal
        open={openD}
        onOpenChange={() => setopenD(false)}
        message={deleteMessage}
        onAcknowledge={() => handleDelete(Number(selected?.id))}
        buttonTitle="بله"
        dialogTitle="حذف"
      />
    </>
  );
};

export default RoomTypeList;
