import RoomTypeBeds from "../components/beds/components/RoomTypeBeds";
import RoomTypePriceForm from "../components/price/RoomTypePriceForm";
import RoomTypeRooms from "../components/rooms/RoomTypeRooms";
import RoomTypeFeatures from "../components/roomType/RoomTypeFeatures";
import RoomTypeForm from "../components/roomType/RoomTypeForm";
import RoomTypeImg from "../components/roomType/RoomTypeImg";
interface Props {
  AccommodationId: number;
  roomTypeId: number;
}

const useRoomTypeTabItems = ({ AccommodationId, roomTypeId }: Props) => {
  const roomTypeTabItems = [
    {
      title: "اطلاعات",
      component: (
        <RoomTypeForm
          AccommodationId={AccommodationId}
          RoomTypeId={roomTypeId}
          buttonTitle="ویرایش"
          asModal={false}
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
      title: "نوع اتاق",
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
      <RoomTypePriceForm
        RoomTypeId={roomTypeId}
        AccommodationId={AccommodationId}
      />
      ),
    },
  ];

  return { roomTypeTabItems };
};

export default useRoomTypeTabItems;
