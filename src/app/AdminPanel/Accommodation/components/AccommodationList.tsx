import { CustomDataTable } from "@/components/list/CustomDataTable";
import type { ColumnDef } from "@tanstack/react-table";

import useGetData from "@/services/useGetData";
import { useNavigate } from "@tanstack/react-router";
import type { TPaginatedResponse } from "@/types";
import { accommodation_key, accommodation_url } from "@/data/querykeys";

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
  const { data, isLoading, error } = useGetData<TPaginatedResponse<AccommodationItem>>({
    key: [accommodation_key],
    url: accommodation_url,
  });
  const navigate = useNavigate();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div className="text-red-600">{String(error)}</div>;

  return (
    <CustomDataTable
      onRowClick={(id) => {
        navigate({
          to: "/accommodation/$id",
          params: { id },
        });
      }}
      showAction={true}
      columns={columns}
      data={data?.results ?? []}
      placeholder="جست و جوی نام اقامتگاه"
    />
  );
};

export default AccommodationList;
