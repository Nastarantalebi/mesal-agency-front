import FormErrorModal from "@/components/form/FormErrorModal";
import { CustomDataTable } from "@/components/list/CustomDataTable";
import ListPagination from "@/components/list/ListPagination";
import { useState } from "react";
import ListDelete from "../../RoomTypes/components/roomTypeListIcons/ListDelete";
import type { TourItem } from "../types";
import CustomDialog from "@/components/modal/CustomDialog";
import useTour from "../services/useTour";
import CustomLoader from "@/components/loading/CustomLoader";
import TourSteps from "./TourSteps";
import { TourListColumns } from "../fixtures/TourListColumns";

const TourList = () => {
  const [currentTourPage, setCurrentTourPage] = useState(1);
  const [selected, setSelected] = useState<TourItem | null>(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);

  const [search, setSearch] = useState("");

  const { deleteTourDeparture, getTourDeprtures } = useTour({
    currentTourPage,
  });

  if (getTourDeprtures.isFetching)
    return (
      <div>
        <CustomLoader />
      </div>
    );

  if (getTourDeprtures.error)
    return <div className="text-red-600">{getTourDeprtures.error.message}</div>;

  const pageCount = getTourDeprtures.data?.count
    ? Math.ceil(getTourDeprtures.data.count / 10)
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
            customAddText="افزودن تور"
            onAdd={() => setOpenAdd(true)}
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
            columns={TourListColumns}
            data={getTourDeprtures.data?.results ?? []}
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
        dialogContent={<TourSteps />}
        dialogTitle="افزودن تور جدید"
        onOpenChange={() => setOpenAdd(false)}
        open={openAdd}
        size="xxl"
      />

      <FormErrorModal
        open={openDelete}
        onOpenChange={() => setOpenDelete(false)}
        message={deleteMessage}
        onAcknowledge={() =>
          deleteTourDeparture.mutateAsync({ id: selected?.id! })
        }
        buttonTitle="بله"
        dialogTitle="حذف"
      />
    </>
  );
};

export default TourList;
