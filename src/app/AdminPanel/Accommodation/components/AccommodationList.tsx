import FormErrorModal from "@/components/form/FormErrorModal";
import { CustomDataTable } from "@/components/list/CustomDataTable";
import ListPagination from "@/components/list/ListPagination";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import ListDelete from "../../RoomTypes/components/roomTypeListIcons/ListDelete";
import { AccommodationListColumns } from "../fixtures/AccommodationListColumns";
import { useAccommodation } from "../services/useAccommodation";
import type { AccommodationItem } from "../types";
import CustomDialog from "@/components/modal";
import AccommodationForm from "./AccommodationForm";

const AccommodationList = () => {
  const [currentAccommodationPage, setCurrentAccommodationPage] = useState(1);
  const [selected, setSelected] = useState<AccommodationItem | null>(null);
  const [openD, setOpenDelete] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);

  const [search, setSearch] = useState("");

  const { deleteAccommodation, getAccommodations } = useAccommodation(
    undefined,
    currentAccommodationPage,
    search
  );

  const navigate = useNavigate();

  if (getAccommodations.isFetching) return <div>Loading...</div>;

  if (getAccommodations.error)
    return (
      <div className="text-red-600">
        {getAccommodations.error.message}
      </div>
    );

  const pageCount = getAccommodations.data?.count
    ? Math.ceil(getAccommodations.data.count / 10)
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
              setCurrentAccommodationPage(1);
              setSearch(value);
            }}
            searchPlaceHolder="جست و جوی نام اقامتگاه"
            customAddText="افزودن اقامتگاه"
            onAdd={() => setOpenAdd(true)}
            onRowClick={(rowData) => {
              navigate({
                to: "/accommodation/$id",
                params: { id: String(rowData.id) },
              });
            }}
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
            columns={AccommodationListColumns}
            data={getAccommodations.data?.results ?? []}
          />
        </div>

        <div className="mt-7 flex justify-center">
          <ListPagination
            pageCount={pageCount}
            currentPage={currentAccommodationPage}
            onPageChange={setCurrentAccommodationPage}
          />
        </div>
      </div>

      <CustomDialog
        dialogContent={<AccommodationForm />}
        dialogTtile="افزودن اقامتگاه جدید"
        onOpenChange={() => setOpenAdd(false)}
        open={openAdd}
      />

      <FormErrorModal
        open={openD}
        onOpenChange={() => setOpenDelete(false)}
        message={deleteMessage}
        onAcknowledge={() =>
          deleteAccommodation.mutateAsync({ id: selected?.id! })
        }
        buttonTitle="بله"
        dialogTitle="حذف"
      />
    </>
  );
};

export default AccommodationList;
