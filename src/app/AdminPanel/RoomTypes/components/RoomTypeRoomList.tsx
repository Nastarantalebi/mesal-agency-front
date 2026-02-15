import type { ColumnDef } from "@tanstack/react-table";
import type { TRoomTypeRoomResponse } from "../types";
import { accommodation_url } from "@/data/querykeys";
import type { TPaginatedResponse } from "@/types";
import useGetData from "@/services/useGetData";
import { CustomDataTable } from "@/components/list/CustomDataTable";

export const columns: ColumnDef<TRoomTypeRoomResponse>[] = [
  { accessorKey: "name", header: "نام اتاق" },
  {
    id: "floor",
    header: "طبقه",
    accessorFn: (row) => row.floor ?? "",
  },
  {
    id: "description",
    header: "توضیحات",
    accessorFn: (row) => row.description ?? "",
  },
];

interface Props {
  AccommodationId: string;
  RoomId: string | null;
}
const RoomTypeRoomList = ({ AccommodationId, RoomId }: Props) => {
  const key = ["RoomType-rooms", RoomId || ""];
  const url = `${accommodation_url}${AccommodationId}/room_types/${RoomId}/rooms/`;

  const { data, isLoading, error } = useGetData<
    TPaginatedResponse<TRoomTypeRoomResponse>
  >({
    key,
    url,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div className="text-red-600">{String(error)}</div>;

  return (
    <div>
      <CustomDataTable
        columns={columns}
        showAction= {false}
        data={data?.results ?? []}
        placeholder="جست و جوی نام اتاق"
      />
    </div>
  );
};

export default RoomTypeRoomList;

