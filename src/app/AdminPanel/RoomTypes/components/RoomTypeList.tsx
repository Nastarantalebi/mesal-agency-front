import { CustomDataTable } from "@/components/list/CustomDataTable";
import type { ColumnDef } from "@tanstack/react-table";
import {
  accommodation_lists_key,
  accommodation_lists_url,
} from "@/data/querykeys";
import useGetData from "@/services/useGetData";
import { useState } from "react";
import RoomTypeForm from "./RoomTypeForm";
import RoomTypeImg from "./RoomTypeImg";

type Type = {
  id: number;
  name: string;
};

type RoomItem = {
  id: number;
  type: Type | null;
  name: string;
};

type Paginated<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

export const columns: ColumnDef<RoomItem>[] = [
  {
    id: "name",
    header: "نوع اتاق",
    accessorFn: (row) => row.name ?? "",
    size: 100,
  },
];

interface Props {
  AccommodationId: string;
}

const RoomList = ({ AccommodationId }: Props) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedId1, setSelectedId1] = useState<string | null>(null);
  const [openImg, setOpenImg] = useState(false);
  const [selectedId2, setSelectedId2] = useState<string | null>(null);

  const { data, isLoading, error } = useGetData<Paginated<RoomItem>>({
    key: [accommodation_lists_key, AccommodationId],
    url: `${accommodation_lists_url}${AccommodationId}/room_types/`,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div className="text-red-600">{String(error)}</div>;

  return (
    <>
      <CustomDataTable
        onEdit={(id) => {
          setSelectedId1(id);
          setOpenEdit(true);
        }}
        onImg={(id) => {
          setSelectedId2(id);
          setOpenImg(true);
        }}
        columns={columns}
        data={data?.results ?? []}
        placeholder="جست و جوی نوع اتاق"
      />
      <RoomTypeForm
        RoomId={selectedId1}
        open={openEdit}
        onOpenChange={() => setOpenEdit(false)}
        title="اطلاعات نوع اتاق"
      />
      <RoomTypeImg
        room_Type_pk={selectedId2}
        accommodationPk={AccommodationId}
        open={openImg}
        onOpenChange={() => setOpenImg(false)}
        title="افزودن عکس"
      />
    </>
  );
};

export default RoomList;
