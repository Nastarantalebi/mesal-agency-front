import FormErrorModal from "@/components/form/FormErrorModal";
import { CustomDataTable } from "@/components/list/CustomDataTable";
import ListPagination from "@/components/list/ListPagination";
import { useState } from "react";
import CustomDialog from "@/components/modal/CustomDialog";
import CustomLoader from "@/components/loading/CustomLoader";
import TourForm from "./TourTemplateForm";
import ListDelete from "@/app/AdminPanel/RoomTypes/components/roomTypeListIcons/ListDelete";
import type { TtourTemplateItems } from "../types";
import useTourTemplate from "../services/useTourTemplate";
import { tourTemplateListColumns } from "../fixtures/TourTemplateListColumns";
const TourTemplateList = () => {
  const [currentTourPage, setCurrentTourPage] = useState(1);
  const [selected, setSelected] = useState<TtourTemplateItems | null>(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const [search, setSearch] = useState("");

  const { getTours, deleteTour } = useTourTemplate({
    currentTourPage: currentTourPage,
    searchInput: search,
  });


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
            customAddText="افزودن تمپلیت تور"
            onAdd={() => setOpenModal(true)}
            onEdit={(data) => {
              setOpenModal(true);
              setSelected(data);
            }}
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
            columns={tourTemplateListColumns}
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
        dialogContent={<TourForm tourId={selected?.id} />}
        dialogTitle={
          selected?.id
            ? `ویرایش تمپلیت تور (${selected.title})`
            : "افزودن تمپلیت تور جدید"
        }
        onOpenChange={() => {
          setOpenModal(false);
          setSelected(null);
        }}
        open={openModal}
        size="xxl"
      />

      <FormErrorModal
        open={openDelete}
        onOpenChange={() => setOpenDelete(false)}
        message={deleteMessage}
        onAcknowledge={() => deleteTour.mutateAsync({ id: selected?.id! })}
        buttonTitle="بله"
        dialogTitle="حذف"
      />
    </>
  );
};

export default TourTemplateList;
