import FormErrorModal from "@/components/form/FormErrorModal";
import { CustomDataTable } from "@/components/list/CustomDataTable";
import ListPagination from "@/components/list/ListPagination";
import { useState } from "react";
import ListDelete from "../../RoomTypes/components/roomTypeListIcons/ListDelete";
import type { TourDepartureItem } from "../types";
import CustomLoader from "@/components/loading/CustomLoader";
import { TourListColumns } from "../fixtures/TourListColumns";
import useDeparture from "../services/useDeparture";

const TourDepartureList = ({ tourTemplateId }: { tourTemplateId: number }) => {
  const [currentTourPage, setCurrentTourPage] = useState(1);
  const [selected, setSelected] = useState<TourDepartureItem | null>(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [search, setSearch] = useState("");

  const { deleteTourDeparture, getTourDeprtures } = useDeparture({
    currentTourPage,
    tourTemplateId,
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
            // onAdd={() => setOpenModal(true)}
            searchPlaceHolder="جست و جوی نام تور"
            customAddText="افزودن تور"
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
            showAddButton={false}
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

      {/* <CustomDialog
        dialogContent={<TourDepartureForm tourTemplateId={tourTemplateId} />}
        dialogTitle="افزودن تمپلیت تور جدید"
        onOpenChange={() => {
          setOpenModal(false);
        }}
        open={openModal}
        size="xxl"
      /> */}

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

export default TourDepartureList;
