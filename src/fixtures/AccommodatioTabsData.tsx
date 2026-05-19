import AccommodationFeatures from "@/app/AdminPanel/Accommodation/components/AccommodationFeatures";
import AccommodationForm from "@/app/AdminPanel/Accommodation/components/AccommodationForm";
import AccommodationPhotoes from "@/app/AdminPanel/Accommodation/components/AccommodationPhotoes";
import AccommodatioPeakDate from "@/app/AdminPanel/Accommodation/components/AccommodationPeakDate";
import RoomTypeList from "@/app/AdminPanel/RoomTypes/components/roomType/RoomTypeList";

export const AccommodationTabsData = (id: number) => [
  {
    title: "اطلاعات اولیه",
    component: <AccommodationForm buttonText="ویرایش" AccommodationId={id} />,
  },
  {
    title: "ویژگی های اقامتگاه",
    component: <AccommodationFeatures AccommodationId={id} />,
  },
  {
    title: "تصاویر اقامتگاه",
    component: <AccommodationPhotoes AccommodationId={id} />,
  },
  {
    title: "لیست نوع اتاق ها",
    component: <RoomTypeList AccommodationId={id} />,
  },
  {
    title: "تاریخ های پیک",
    component: <AccommodatioPeakDate AccommodationId={+id} />,
  },
];

{
  /* <RoomTypeForm AccommodationId={+id} buttonTitle="ثبت" asModal={false} /> */
}
