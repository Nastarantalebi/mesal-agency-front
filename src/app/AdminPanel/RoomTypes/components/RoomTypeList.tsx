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
import RoomTypeFeatures from "./RoomTypeFeatures";
import ListBeds from "./ListBeds";
import ListImage from "./ListImage";
import ListFeatures from "./ListFeatures";

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
  const [openF, setOpenF] = useState(false);
  const [selectedId3, setSelectedId3] = useState<string | null>(null);
  const [openB, setOpenB] = useState(false);
  const [selectedId4, setSelectedId4] = useState<string | null>(null);

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
        extraAction={(id) => (
          <>
            <ListImage
              id={id}
              onClick={(id) => {
                setSelectedId2(id);
                setOpenImg(true);
              }}
            />
            <ListFeatures
              id={id}
              onClick={(id) => {
                setSelectedId3(id);
                setOpenF(true);
              }}
            />
            <ListBeds id={id}
              onClick={(id) => {
                setSelectedId4(id);
                setOpenB(true);
              }}/>
          </>
        )}
        // onBed={(id) => {
        //   setSelectedId3(id);
        //   setOpenB(true);
        // }}
        columns={columns}
        data={data?.results ?? []}
        placeholder="جست و جوی نوع اتاق"
      />
      <RoomTypeForm
        AccommodationId={AccommodationId}
        RoomId={selectedId1}
        open={openEdit}
        onOpenChange={() => setOpenEdit(false)}
        title="اطلاعات نوع اتاق"
      />
      <RoomTypeImg
        RoomId={selectedId2}
        accommodationPk={AccommodationId}
        open={openImg}
        onOpenChange={() => setOpenImg(false)}
        title="افزودن عکس"
      />
      <RoomTypeFeatures
        RoomId={selectedId3}
        AccommodationId={AccommodationId}
        open={openF}
        onOpenChange={() => setOpenF(false)}
        title="افزودن ویژگی"
      />
      
    </>
  );
};

export default RoomList;
