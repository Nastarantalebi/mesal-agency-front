import FormErrorModal from "@/components/FormErrorModal";
import { CustomDataTable } from "@/components/list/CustomDataTable";
import ListPagination from "@/components/list/ListPagination";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import ListDelete from "../../RoomTypes/components/roomTypeListIcons/ListDelete";
import { AccommodationListColumns } from "../fixtures/AccommodationListColumns";
import { useAccommodation } from "../services/useAccommodation";
import type { AccommodationItem } from "../types";


const AccommodationList = () => {
  const [currentAccommodationPage, setCurrentAccommodationPage] = useState(1);
  const [selected, setSelected] = useState<AccommodationItem | null>(null);
  const [openD, setOpenDelete] = useState(false);

  const { deleteAccommodation, getAccommodations } = useAccommodation(currentAccommodationPage)


  const navigate = useNavigate();

  if (getAccommodations.isFetching) return <div>Loading...</div>;
  if (getAccommodations.error) return <div className="text-red-600">{String(getAccommodations.error.message)}</div>;

  const PageCount = getAccommodations.data?.count ? Math.ceil(getAccommodations.data.count / 10) : 0;
  const deleteMessage = "آیا از حذف آیتم اطمینان دارید؟";

  const handleDelete = async (id: number) => {
    await deleteAccommodation.mutateAsync({ id });
  };

  return (
    <>
      <CustomDataTable
        onRowClick={(rowData) => {
          navigate({
            to: "/accommodation/$id",
            params: { id: String(rowData.id) },
          });
        }}
        extraAction={(rowData) => (
          <ListDelete
            onClick={() => {
              setSelected(rowData);
              setOpenDelete(true);
            }}
          />
        )}
        showAction={true}
        columns={AccommodationListColumns}
        data={getAccommodations.data?.results ?? []}
        placeholder="جست و جوی نام اقامتگاه"
      />
      <div className="mt-7">
        <ListPagination
          pageCount={PageCount}
          currentPage={currentAccommodationPage}
          onPageChange={setCurrentAccommodationPage}
        />
      </div>
      <FormErrorModal
        open={openD}
        onOpenChange={() => setOpenDelete(false)}
        message={deleteMessage}
        onAcknowledge={() => handleDelete(Number(selected?.id))}
        buttonTitle="بله"
        dialogTitle="حذف"
      />
    </>
  );
};

export default AccommodationList;
