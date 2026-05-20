import FormErrorModal from "@/components/form/FormErrorModal";
import { CustomDataTable } from "@/components/list/CustomDataTable";
import ListPagination from "@/components/list/ListPagination";
import { useState } from "react";
import ListDelete from "../../RoomTypes/components/roomTypeListIcons/ListDelete";
import CustomLoader from "@/components/loading/CustomLoader";
import type { TtourPlanResponse } from "../fixtures/validation";
import { PlanListColumns } from "../fixtures/PlanListColumns";
import usePlans from "../services/usePlans";

const TourPlansList = ({
  tourTemplateId,
  departureId,
}: {
  tourTemplateId: number;
  departureId: number;
}) => {
  const [currentPlanPage, setCurrentPlanPage] = useState(1);
  const [selected, setSelected] = useState<TtourPlanResponse | null>(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [search, setSearch] = useState("");


  const { getDeparturePlans, deleteDeparturePlans } = usePlans({
    tourTemplateId,
    departureId,
  });

  if (getDeparturePlans.isFetching)
    return (
      <div>
        <CustomLoader />
      </div>
    );

  const pageCount = getDeparturePlans.data?.count
    ? Math.ceil(getDeparturePlans.data.count / 10)
    : 0;

  return (
    <>
      <div className="px-2 sm:px-0">
        <div className="overflow-x-auto rounded-md mt-4">
          <CustomDataTable
            searchValue={search}
            onSearchChange={setSearch}
            onSearch={(value) => {
              setCurrentPlanPage(1);
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
            columns={PlanListColumns}
            data={getDeparturePlans.data?.results ?? []}
            showAddButton={false}
          />
        </div>

        <div className="mt-7 flex justify-center">
          <ListPagination
            pageCount={pageCount}
            currentPage={currentPlanPage}
            onPageChange={setCurrentPlanPage}
          />
        </div>
      </div>

      <FormErrorModal
        open={openDelete}
        onOpenChange={() => setOpenDelete(false)}
        onAcknowledge={() => deleteDeparturePlans.mutateAsync({ id: selected?.id! })}
        buttonTitle="بله"
        dialogTitle="حذف"
      />
    </>
  );
};

export default TourPlansList;
