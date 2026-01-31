import { CustomDataTable } from '@/components/list/CustomDataTable'
import type { ColumnDef } from "@tanstack/react-table"
import type { TCreateAccomodation } from '../types'
import { accommodation_lists_key, accommodation_lists_url } from '@/data/querykeys';
import useGetData from '@/services/useGetData';


type AccommodationItem = {
  id: number;
  name: string;
  type: string;
  city: string | null;
};

type Paginated<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

export const columns: ColumnDef<AccommodationItem>[] = [
  { accessorKey: "name", header: "نام اقامتگاه" },
  { accessorKey: "type", header: "نوع اقامتگاه" },
  { accessorKey: "city", header: "شهر" },
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
