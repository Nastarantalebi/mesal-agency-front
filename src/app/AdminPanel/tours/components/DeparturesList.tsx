import { CustomDataTable } from "@/components/list/CustomDataTable";
import ListPagination from "@/components/list/ListPagination";
import { useState } from "react";
import ListDelete from "../../RoomTypes/components/roomTypeListIcons/ListDelete";
import CustomLoader from "@/components/loading/CustomLoader";
import useDeparture from "../services/useDeparture";
import { DepartureListColumns } from "../fixtures/DepartureListColumns";
import { useNavigate } from "@tanstack/react-router";
import useTour from "../services/useTour";
import FormErrorModal from "@/components/form/FormErrorModal";
import type { TdepartureResponse } from "../types";
import ListEdit from "@/components/list/ListEdit";
import CustomDialog from "@/components/modal/CustomDialog";
import TourDepartureForm from "./TourDepartureForm";

const DeparturesList = () => {
  const [currentTourPage, setCurrentTourPage] = useState(1);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [selected, setSelected] = useState<TdepartureResponse | null>(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const getDepartures = useDeparture();
  const { deleteTourDeparture } = useTour({
    tourTemplateId: selected?.tour.id,
  });

  if (getDepartures.isFetching)
    return (
      <div>
        <CustomLoader />
      </div>
    );

  const pageCount = getDepartures.data?.count
    ? Math.ceil(getDepartures.data.count / 10)
    : 0;

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
            onAdd={() => navigate({ to: "/admin/tour/create" })}
            customAddText="افزودن تور جدید"
            searchPlaceHolder="جست و جوی نام تور"
            extraAction={(rowData) => (
              <div className="flex flex-wrap gap-1 sm:gap-2 justify-center">
                <ListDelete
                  onClick={() => {
                    setSelected(rowData);
                    setOpenDelete(true);
                  }}
                />
                <ListEdit
                  onClick={() => {
                    setSelected(rowData);
                    setOpenEdit(true);
                  }}
                />
              </div>
            )}
            showAction
            columns={DepartureListColumns}
            data={getDepartures.data?.results ?? []}
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
        dialogContent={
          <TourDepartureForm
            tourTemplateId={selected?.tour.id!}
            departureId={selected?.id}
          />
        }
        open={openEdit}
        onOpenChange={(isOpen) => {
          setOpenEdit(isOpen);
          if (!isOpen) setSelected(null);
        }}
        dialogTitle={`ویرایش تور(${selected?.tour.title})`}
        size="xxl"
      />

      <FormErrorModal
        open={openDelete}
        onOpenChange={() => setOpenDelete(false)}
        onAcknowledge={() =>
          deleteTourDeparture.mutateAsync({ id: selected?.id! })
        }
        buttonTitle="بله"
        dialogTitle="حذف"
      />
    </>
  );
};

export default DeparturesList;
