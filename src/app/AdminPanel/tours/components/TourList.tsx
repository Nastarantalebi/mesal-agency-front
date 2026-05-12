import FormErrorModal from "@/components/form/FormErrorModal";
import { CustomDataTable } from "@/components/list/CustomDataTable";
import ListPagination from "@/components/list/ListPagination";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import ListDelete from "../../RoomTypes/components/roomTypeListIcons/ListDelete";
import CustomDialog from "@/components/modal";
import type { TtourItems } from "../types/types";
import useTour from "../services/useTour";
import CustomLoader from "@/components/loading/CustomLoader";
import { tourListColumns } from "../fixtures/tourListColumns";
import TourForm from "./TourForm";

const TourList = () => {
  const [currentTourPage, setCurrentTourPage] = useState(1);
  const [selected, setSelected] = useState<TtourItems | null>(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);

  const [search, setSearch] = useState("");

  const { getTours, deleteTour } = useTour({
    currentTourPage: currentTourPage,
    searchInput: search,
  });

//   const navigate = useNavigate();

  if (getTours.isFetching)
    return (
      <div>
        <CustomLoader />
      </div>
    );

  if (getTours.error)
    return <div className="text-red-600">{getTours.error.message}</div>;

  const pageCount = getTours.data?.count
    ? Math.ceil(getTours.data.count / 10)
    : 0;

  const deleteMessage = "آیا از حذف آیتم اطمینان دارید؟";

  return (
    <>
      <div className="px-2 sm:px-0">
        <div className="overflow-x-auto rounded-md mt-4">
          <CustomDataTable
            searchValue={search}
            onSearchChange={setSearch}
            onSearch={(value) => {
              setCurrentTourPage(1);
              setSearch(value);
            }}
            searchPlaceHolder="جست و جوی نام تور"
            customAddText="افزودن "
            onAdd={() => setOpenAdd(true)}
            // onRowClick={(rowData) => {
            //   navigate({
            //     to: "/accommodation/$id",
            //     params: { id: String(rowData.id) },
            //   });
            // }}
            extraAction={(rowData) => (
              <div className="flex flex-wrap gap-1 sm:gap-2 justify-center">
                <ListDelete
                  onClick={() => {
                    setSelected(rowData);
                    setOpenDelete(true);
                  }}
                />
              </div>
            )}
            showAction
            columns={tourListColumns}
            data={getTours.data?.results ?? []}
          />
        </div>

        <div className="mt-7 flex justify-center">
          <ListPagination
            pageCount={pageCount}
            currentPage={currentTourPage}
            onPageChange={setCurrentTourPage}
          />
        </div>
      </div>

      <CustomDialog
        dialogContent={<TourForm />}
        dialogTtile="افزودن اقامتگاه جدید"
        onOpenChange={() => setOpenAdd(false)}
        open={openAdd}
      />

      <FormErrorModal
        open={openDelete}
        onOpenChange={() => setOpenDelete(false)}
        message={deleteMessage}
        onAcknowledge={() =>
          deleteTour.mutateAsync({ id: selected?.id! })
        }
        buttonTitle="بله"
        dialogTitle="حذف"
      />
    </>
  );
};

export default TourList;
