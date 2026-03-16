import { CustomDataTable } from "@/components/list/CustomDataTable";
import type { ColumnDef } from "@tanstack/react-table";
import useGetData from "@/services/useGetData";
import { useState } from "react";
import RoomTypeForm from "./RoomTypeForm";
import RoomTypeImg from "./RoomTypeImg";
import RoomTypeFeatures from "./RoomTypeFeatures";
import ListBeds from "./roomTypeListIcons/ListBeds";
import ListImage from "./roomTypeListIcons/ListImage";
import ListFeatures from "./roomTypeListIcons/ListFeatures";
import RoomTypeBeds from "./beds/components/RoomTypeBeds";
import type { TPaginatedResponse } from "@/types";
import { accommodation_url } from "@/data/querykeys";
import ListRooms from "./roomTypeListIcons/ListRooms";
import RoomTypeRooms from "./rooms/RoomTypeRooms";
import ListDelete from "./roomTypeListIcons/ListDelete";
import FormErrorModal from "@/components/FormErrorModal";
import useDeleteData from "@/services/useDeleteData";
import { toast } from "sonner";
import ListPrice from "./roomTypeListIcons/ListPrice";
import RoomTypePriceForm from "./price/RoomTypePriceForm";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

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

const RoomTypeList = ({ AccommodationId }: Props) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [selected, setSelected] = useState<RoomItem | null>(null);

  // const [selectedName, setSelectedName] = useState<string| null>(null);
  const [openAdd, setAddRoomType] = useState(false);
  const [openImg, setOpenImg] = useState(false);
  const [openF, setOpenF] = useState(false);
  const [openB, setOpenB] = useState(false);
  const [openR, setopenR] = useState(false);
  const [openD, setopenD] = useState(false);
  const [openP, setopenP] = useState(false);

  // const key = [accommodation_key, AccommodationId, "roomType"];
  const key = ["RoomTypes", AccommodationId || ""];
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
      <Button
        variant={"outline"}
        className="mb-5 border-3 border-accent hover:bg-accent/10"
        onClick={() => {
          setAddRoomType(true);
        }}
      >
        <Plus className="" />
        افزودن نوع اتاق جدید
      </Button>
      <CustomDataTable
        onEdit={(rowData) => {
          setSelected(rowData);
          setOpenEdit(true);
        }}
        extraAction={(rowData) => (
          <>
            <ListImage
              onClick={() => {
                setSelected(rowData);
                setOpenImg(true);
              }}
            />
            <ListFeatures
              onClick={() => {
                setSelected(rowData);
                setOpenF(true);
              }}
            />
            <ListBeds
              onClick={() => {
                setSelected(rowData);
                setOpenB(true);
              }}
            />
            <ListRooms
              onClick={() => {
                setSelected(rowData);
                setopenR(true);
              }}
            />
            <ListPrice
              onClick={() => {
                setSelected(rowData);
                setopenP(true);
              }}
            />
            <ListDelete
              onClick={() => {
                setSelected(rowData);
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
        open={openAdd}
        onOpenChange={() => setAddRoomType(false)}
        title="افزودن نوع اتاق جدید"
        buttonTitle="ثبت"
        asModal={true}
      />

      <RoomTypeForm
        AccommodationId={AccommodationId}
        RoomId={selected?.id}
        open={openEdit}
        onOpenChange={() => setOpenEdit(false)}
        title="اطلاعات نوع اتاق"
        buttonTitle="ویرایش"
        asModal={true}
      />
      <RoomTypeImg
        RoomName={selected?.name}
        RoomId={selected?.id}
        accommodationPk={AccommodationId}
        open={openImg}
        onOpenChange={() => setOpenImg(false)}
        title="افزودن عکس"
      />
      <RoomTypeFeatures
        RoomName={selected?.name}
        RoomId={selected?.id}
        AccommodationId={AccommodationId}
        open={openF}
        onOpenChange={() => setOpenF(false)}
        title="افزودن ویژگی"
      />
      <RoomTypeBeds
        RoomName={selected?.name}
        RoomId={selected?.id}
        AccommodationId={AccommodationId}
        open={openB}
        onOpenChange={() => setOpenB(false)}
        title="افزودن تخت"
      />
      <RoomTypeRooms
        RoomName={selected?.name}
        RoomId={selected?.id}
        AccommodationId={AccommodationId}
        open={openR}
        onOpenChange={() => setopenR(false)}
        title="افزودن اتاق"
      />
      <RoomTypePriceForm
        RoomName={selected?.name}
        RoomId={selected?.id}
        AccommodationId={AccommodationId}
        open={openP}
        onOpenChange={() => setopenP(false)}
        title="تعیین قیمت"
      />
      <FormErrorModal
        open={openD}
        onOpenChange={() => setopenD(false)}
        message={deleteMessage}
        onAcknowledge={() => handleDelete(Number(selected?.id))}
        buttonTitle="بله"
        dialogTitle="حذف"
      />
    </>
  );
};

export default RoomTypeList;
