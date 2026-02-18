import { CustomDataTable } from "@/components/list/CustomDataTable";
import type { ColumnDef } from "@tanstack/react-table";
import useGetData from "@/services/useGetData";
import { useState } from "react";
import RoomTypeForm from "./RoomTypeForm";
import RoomTypeImg from "./RoomTypeImg";
import RoomTypeFeatures from "./RoomTypeFeatures";
import ListBeds from "./ListBeds";
import ListImage from "./ListImage";
import ListFeatures from "./ListFeatures";
import RoomTypeBeds from "./RoomTypeBeds";
import type { TPaginatedResponse } from "@/types";
import { accommodation_key, accommodation_url } from "@/data/querykeys";
import ListRooms from "./ListRooms";
import RoomTypeRooms from "./RoomTypeRooms";
import ListDelete from "./ListDelete";
import FormErrorModal from "@/components/FormErrorModal";
import useDeleteData from "@/services/useDeleteData";
import { toast } from "sonner";
import ListPrice from "./ListPrice";
import RoomTypePriceForm from "./RoomTypePriceForm";

type Type = {
  id: number;
  name: string;
};

type RoomItem = {
  id: number;
  type: Type | null;
  name: string;
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
  const [selectedId, setSelectedId] = useState<string | null>(null);
  // const [selectedName, setSelectedName] = useState<string| null>(null);
  const [openImg, setOpenImg] = useState(false);
  const [openF, setOpenF] = useState(false);
  const [openB, setOpenB] = useState(false);
  const [openR, setopenR] = useState(false);
  const [openD, setopenD] = useState(false);
  const [openP, setopenP] = useState(false);

  const key = [accommodation_key, AccommodationId];
  const url = `${accommodation_url}${AccommodationId}/room_types/`;

  const { data, isLoading, error } = useGetData<TPaginatedResponse<RoomItem>>({
    key,
    url,
  });

  const { mutateAsync: deleteRoomType } = useDeleteData({
    key,
    url,
  });

  const handleDelete = async (id: number) => {
    try {
      await deleteRoomType({ id });
      toast.success("آیتم با موفقیت حذف شد");
    } catch (error) {
      toast.error("خطا در حذف آیتم");
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div className="text-red-600">{String(error)}</div>;

  const deleteMessage = "آیا از حذف آیتم اطمینان دارید؟";

  return (
    <>
      <CustomDataTable
        onEdit={(id) => {
          setSelectedId(id);
          setOpenEdit(true);
        }}
        extraAction={(id) => (
          <>
            <ListImage
              id={id}
              onClick={(id) => {
                setSelectedId(id);
                setOpenImg(true);
              }}
            />
            <ListFeatures
              id={id}
              onClick={(id) => {
                setSelectedId(id);
                setOpenF(true);
              }}
            />
            <ListBeds
              id={id}
              onClick={(id) => {
                setSelectedId(id);
                setOpenB(true);
              }}
            />
            <ListRooms
              id={id}
              onClick={(id) => {
                setSelectedId(id);
                setopenR(true);
              }}
            />
            <ListPrice
              id={id}
              onClick={(id) => {
                setSelectedId(id);
                setopenP(true);
              }}
            />
            <ListDelete
              id={id}
              onClick={(id) => {
                setSelectedId(id);
                setopenD(true);
              }}
            />
          </>
        )}
        showAction={true}
        columns={columns}
        data={data?.results ?? []}
        placeholder="جست و جوی نوع اتاق"
      />

      <RoomTypeForm
        AccommodationId={AccommodationId}
        RoomId={selectedId}
        open={openEdit}
        onOpenChange={() => setOpenEdit(false)}
        title="اطلاعات نوع اتاق"
      />
      <RoomTypeImg
        RoomId={selectedId}
        accommodationPk={AccommodationId}
        open={openImg}
        onOpenChange={() => setOpenImg(false)}
        title="افزودن عکس"
      />
      <RoomTypeFeatures
        RoomId={selectedId}
        AccommodationId={AccommodationId}
        open={openF}
        onOpenChange={() => setOpenF(false)}
        title="افزودن ویژگی"
      />
      <RoomTypeBeds
        RoomId={selectedId}
        AccommodationId={AccommodationId}
        open={openB}
        onOpenChange={() => setOpenB(false)}
        title="افزودن تخت"
      />
      <RoomTypeRooms
        RoomId={selectedId}
        AccommodationId={AccommodationId}
        open={openR}
        onOpenChange={() => setopenR(false)}
        title="افزودن اتاق"
      />
      <RoomTypePriceForm
        RoomId={selectedId}
        AccommodationId={AccommodationId}
        open={openP}
        onOpenChange={() => setopenP(false)}
        title="تعیین قیمت"
      />
      <FormErrorModal
        open={openD}
        onOpenChange={() => setopenD(false)}
        message={deleteMessage}
        onAcknowledge={() => handleDelete(Number(selectedId))}
        buttonTitle="بله"
        dialogTitle="حذف"
      />
    </>
  );
};

export default RoomList;
