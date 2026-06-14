import RoomTypeBeds from "@/app/AdminPanel/RoomTypes/components/beds/components/RoomTypeBeds";
import PriceForm from "@/app/AdminPanel/RoomTypes/components/price/PriceForm";
import RoomTypeRooms from "@/app/AdminPanel/RoomTypes/components/rooms/RoomTypeRooms";
import RoomTypeFeatures from "@/app/AdminPanel/RoomTypes/components/roomType/RoomTypeFeatures";
import RoomTypeForm from "@/app/AdminPanel/RoomTypes/components/roomType/RoomTypeForm";
import RoomTypeImg from "@/app/AdminPanel/RoomTypes/components/roomType/RoomTypeImg";

interface Props {
  AccommodationId: number;
  roomTypeId: number;
}

export const RoomTypeTabsData = ({ AccommodationId, roomTypeId }: Props) => [
      {
      title: "اطلاعات",
      component: (
        <RoomTypeForm
          AccommodationId={AccommodationId}
          RoomTypeId={roomTypeId}
        />
      ),
    },
    {
      title: "عکس ها",
      component: (
        <RoomTypeImg
          AccommodationId={AccommodationId}
          RoomTypeId={roomTypeId}
        />
      ),
    },
    {
      title: "ویژگی ها",
      component: (
        <RoomTypeFeatures
          RoomTypeId={roomTypeId}
          AccommodationId={AccommodationId}
        />
      ),
    },
    {
      title: "نوع تخت",
      component: (
        <RoomTypeBeds
          RoomTypeId={roomTypeId}
          AccommodationId={AccommodationId}
        />
      ),
    },
    {
      title: "اتاق ها",
      component: (
        <RoomTypeRooms
          RoomTypeId={roomTypeId}
          AccommodationId={AccommodationId}
        />
      ),
    },
    {
      title: "قیمت",
      component: (
        <PriceForm
          RoomTypeId={roomTypeId}
          AccommodationId={AccommodationId}
        />
      ),
    },
];

{/* <RoomTypeForm AccommodationId={+id} buttonTitle="ثبت" asModal={false} /> */}