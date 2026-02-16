import { CustomDataTable } from "@/components/list/CustomDataTable";
import type { ColumnDef } from "@tanstack/react-table";

import useGetData from "@/services/useGetData";
import { useNavigate } from "@tanstack/react-router";
import type { TPaginatedResponse } from "@/types";
import { accommodation_key, accommodation_url } from "@/data/querykeys";
import ListPagination from "@/components/list/ListPagination";
import { useState } from "react";
import ListDelete from "../../RoomTypes/components/ListDelete";
import { string } from "zod";
import FormErrorModal from "@/components/FormErrorModal";
import useDeleteData from "@/services/useDeleteData";
import { toast } from "sonner";

type City = {
  id: number;
  name: string;
};
type Type = {
  id: number;
  name: string;
};

type AccommodationItem = {
  id: number;
  name: string;
  type: Type | null;
  city: City | null;
};

export const columns: ColumnDef<AccommodationItem>[] = [
  { accessorKey: "name", header: "نام اقامتگاه" },
  {
    id: "type",
    header: "نوع اقامتگاه",
    accessorFn: (row) => row.type?.name ?? "",
  },
  {
    id: "city",
    header: "شهر",
    accessorFn: (row) => row.city?.name ?? "",
  },
];

const AccommodationList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [openD, setOpenDelete] = useState(false);

  const { data, isLoading, error } = useGetData<
    TPaginatedResponse<AccommodationItem>
  >({
    key: [accommodation_key, String(currentPage)],
    url: `${accommodation_url}?page=${currentPage}`,
  });

  const { mutateAsync: deleteAccommodation } = useDeleteData({
    key: [accommodation_key],
    url: `${accommodation_url}`,
  });

  const navigate = useNavigate();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div className="text-red-600">{String(error)}</div>;

  const PageCount = data?.count ? Math.ceil(data.count / 10) : 0;
  const deleteMessage = "آیا از حذف آیتم اطمینان دارید؟";
  const handleDelete = async (id: number) => {
    try {
      await deleteAccommodation({ id });
      toast.success("آیتم با موفقیت حذف شد");
    } catch (error) {
      toast.error("خطا در حذف آیتم");
    }
  };

  return (
    <>
      <CustomDataTable
        onRowClick={(id) => {
          navigate({
            to: "/accommodation/$id",
            params: { id },
          });
        }}
        extraAction={(id) => (
          <ListDelete
            id={id}
            onClick={(id) => {
              setSelectedId(id);
              setOpenDelete(true);
            }}
          />
        )}
        showAction={true}
        columns={columns}
        data={data?.results ?? []}
        placeholder="جست و جوی نام اقامتگاه"
      />
      <div className="mt-7">
        <ListPagination
          pageCount={PageCount}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
      <FormErrorModal
        open={openD}
        onOpenChange={() => setOpenDelete(false)}
        message={deleteMessage}
        onAcknowledge={() => handleDelete(Number(selectedId))}
        buttonTitle="بله"
        dialogTitle="حذف"
      />
    </>
  );
};

export default AccommodationList;
