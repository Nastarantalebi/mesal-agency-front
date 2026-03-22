import FormErrorModal from "@/components/form/FormErrorModal";
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
  // const [searchInput, setSearchInput] = useState("");

  const { deleteAccommodation, getAccommodations } = useAccommodation(undefined, currentAccommodationPage)

  const navigate = useNavigate();

  if (getAccommodations.isFetching) return <div>Loading...</div>;
  if (getAccommodations.error) return <div className="text-red-600">{getAccommodations.error.message}</div>;

  const PageCount = getAccommodations.data?.count ? Math.ceil(getAccommodations.data.count / 10) : 0;
  const deleteMessage = "آیا از حذف آیتم اطمینان دارید؟";
  
  // console.log(`Accommodations: ${JSON.stringify(getAccommodations.data?.results)}`);
  // console.log(`searchInput:${searchInput}`);


  return (
    <>
      {/* <div className="relative mb-4 max-w-3xs">
          <Input
            placeholder="جست و جوی نام اقامتگاه"
            // value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            className="pl-9"
          />
          <Button 
              className=" cursor-pointer absolute left-6 top-1/3 -translate-y-1/2 h-2 w-2" 
      >
            <Search/>
          </Button>   
      </div> */}
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
        data={getAccommodations.data?.results!}
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
        onAcknowledge={() => deleteAccommodation.mutateAsync({ id:selected?.id! })}
        buttonTitle="بله"
        dialogTitle="حذف"
      />
    </>
  );
};

export default AccommodationList;
