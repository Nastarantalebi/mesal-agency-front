import FormErrorModal from "@/components/form/FormErrorModal";
import { CustomDataTable } from "@/components/list/CustomDataTable";
import { Button } from "@/components/ui/button";
import type { ColumnDef } from "@tanstack/react-table";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useRoomTypeList } from "../../services/useRoomType";
import type { Props, RoomItem } from "../../types/index";
import RoomTypeBeds from "../beds/components/RoomTypeBeds";
import RoomTypePriceForm from "../price/RoomTypePriceForm";
import RoomTypeRooms from "../rooms/RoomTypeRooms";
import RoomTypeFeatures from "./RoomTypeFeatures";
import RoomTypeForm from "./RoomTypeForm";
import RoomTypeImg from "./RoomTypeImg";
import ListBeds from "../roomTypeListIcons/ListBeds";
import ListDelete from "../roomTypeListIcons/ListDelete";
import ListFeatures from "../roomTypeListIcons/ListFeatures";
import ListImage from "../roomTypeListIcons/ListImage";
import ListPrice from "../roomTypeListIcons/ListPrice";
import ListRooms from "../roomTypeListIcons/ListRooms";

export const columns: ColumnDef<RoomItem>[] = [
  {
    id: "name",
    header: "نوع اتاق",
    accessorFn: (row) => row.name ?? "",
    size: 100,
  },
];


const RoomTypeList = ({ AccommodationId }: Props) => {

  const { getRoomTypeList, deleteRoomType } = useRoomTypeList(AccommodationId)

  const [openEdit, setOpenEdit] = useState(false);
  const [selected, setSelected] = useState<RoomItem | null>(null);

  const [openAdd, setAddRoomType] = useState(false);
  const [openImg, setOpenImg] = useState(false);
  const [openF, setOpenF] = useState(false);
  const [openB, setOpenB] = useState(false);
  const [openR, setopenR] = useState(false);
  const [openD, setopenD] = useState(false);
  const [openP, setopenP] = useState(false);


  const handleDelete = async (id: number) => {
    await deleteRoomType.mutateAsync({ id });
  };

  if (getRoomTypeList.isFetching) return <div>Loading...</div>;
  if (getRoomTypeList.error) return <div className="text-red-600">{getRoomTypeList.error.message}</div>;

  const deleteMessage = "آیا از حذف آیتم اطمینان دارید؟";

  return (
    <>
      <Button
        variant={"outline"}
        className="mb-5 border-green-600 text-green-600 hover:bg-green-50 hover:text-green-600"
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
        data={getRoomTypeList.data?.results ?? []}
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
        RoomTypeId={selected?.id}
        open={openEdit}
        onOpenChange={() => setOpenEdit(false)}
        title="اطلاعات نوع اتاق"
        buttonTitle="ویرایش"
        asModal={true}
      />
      <RoomTypeImg
        RoomTypeName={selected?.name}
        RoomTypeId={selected?.id}
        AccommodationId={AccommodationId}
        open={openImg}
        onOpenChange={() => setOpenImg(false)}
        title="افزودن عکس"
      />
      <RoomTypeFeatures
        RoomTypeName={selected?.name}
        RoomTypeId={selected?.id}
        AccommodationId={AccommodationId}
        open={openF}
        onOpenChange={() => setOpenF(false)}
        title="افزودن ویژگی"
      />
      <RoomTypeBeds
        RoomTypeName={selected?.name}
        RoomTypeId={selected?.id}
        AccommodationId={AccommodationId}
        open={openB}
        onOpenChange={() => setOpenB(false)}
        title="افزودن تخت"
      />
      <RoomTypeRooms
        RoomTypeName={selected?.name}
        RoomTypeId={selected?.id}
        AccommodationId={AccommodationId}
        open={openR}
        onOpenChange={() => setopenR(false)}
        title="افزودن اتاق"
      />
      <RoomTypePriceForm
        RoomTypeName={selected?.name}
        RoomTypeId={selected?.id}
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
