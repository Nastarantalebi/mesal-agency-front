import { CustomDataTable } from "@/components/list/CustomDataTable";
import type { ColumnDef } from "@tanstack/react-table";
import {
  accommodation_lists_key,
  accommodation_lists_url,
} from "@/data/querykeys";
import useGetData from "@/services/useGetData";

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

type Paginated<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

export const columns: ColumnDef<AccommodationItem>[] = [
  { accessorKey: "name", header: "نام اقامتگاه", size: 20 },
  {
    id: "type",
    header: "نوع اقامتگاه",
    accessorFn: (row) => row.type?.name ?? "",
    size: 20,
  },
  {
    id: "city",
    header: "شهر",
    accessorFn: (row) => row.city?.name ?? "",
    size: 20,
  },
  {
    id: "actions",
    header: "عملیات",
    size: 20,
    
  },
];

const AccommodationList = () => {
  const { data, isLoading, error } = useGetData<Paginated<AccommodationItem>>({
    key: [accommodation_lists_key],
    url: accommodation_lists_url,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div className="text-red-600">{String(error)}</div>;

  return <CustomDataTable columns={columns} data={data?.results ?? []} />;
};

export default AccommodationList;
