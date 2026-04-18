import FormErrorModal from "@/components/form/FormErrorModal";
import { CustomDataTable } from "@/components/list/CustomDataTable";
import ListPagination from "@/components/list/ListPagination";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import ListDelete from "../../RoomTypes/components/roomTypeListIcons/ListDelete";
import { AccommodationListColumns } from "../fixtures/AccommodationListColumns";
import { useAccommodation } from "../services/useAccommodation";
import type { AccommodationItem } from "../types";
import SearchInput from "@/components/list/SearchInput";

const AccommodationList = () => {
  const [currentAccommodationPage, setCurrentAccommodationPage] = useState(1);
  const [selected, setSelected] = useState<AccommodationItem | null>(null);
  const [openD, setOpenDelete] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [input, setInput] = useState("");

  const { deleteAccommodation, getAccommodations } = useAccommodation(
    undefined,
    currentAccommodationPage,
    searchInput
  );

  const navigate = useNavigate();

  if (getAccommodations.isFetching) return <div>Loading...</div>;
  if (getAccommodations.error)
    return (
      <div className="text-red-600">{getAccommodations.error.message}</div>
    );

  const PageCount = getAccommodations.data?.count
    ? Math.ceil(getAccommodations.data.count / 10)
    : 0;
  const deleteMessage = "آیا از حذف آیتم اطمینان دارید؟";

  return (
    <>
      <div className="px-2 sm:px-0">
        
        <SearchInput
          input={input}
          setInput={setInput}
          setSearchInput={setSearchInput}
          placeholder="جست و جوی نام اقامتگاه"
        />

        <div className="overflow-x-auto rounded-md mt-4">
          <CustomDataTable
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
            showAction={true}
            columns={AccommodationListColumns}
            data={getAccommodations.data?.results!}
          />
        </div>

        <div className="mt-7 flex justify-center">
          <ListPagination
            pageCount={PageCount}
            currentPage={currentAccommodationPage}
            onPageChange={setCurrentAccommodationPage}
          />
        </div>
      </div>

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
