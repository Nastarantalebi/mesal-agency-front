import {
  SquarePen,
  Star,
  Image,
  List,
  LayoutDashboard,
  Calendar,
} from "lucide-react";

export const sidebarItems = (id: string) => [
  {
    title: "داشبورد",
    url: `/dashboard`,
    icon: <LayoutDashboard/>,
  },
  {
    title: "اطلاعات اولیه",
    url: `/accommodation/${id}/info`,
    icon: <SquarePen />,
  },
  {
    title: "ویژگی های اقامتگاه",
    url: `/accommodation/${id}/features`,
    icon: <Star />,
  },
  {
    title: "تصاویر اقامتگاه",
    url: `/accommodation/${id}/images`,
    icon: <Image />,
  },
  {
    title: "لیست نوع اتاق ها",
    url: `/accommodation/${id}/listRoomTypes`,
    icon: <List />,
    // children: [
    //   {
    //     title: "ثبت نوع اتاق",
    //     url: `/accommodation/${id}/addRoomTypes`,
    //     icon: <CopyPlus />,
    //   },
    //   {
    //     title: "لیست نوع اتاق ها",
    //     url: `/accommodation/${id}/listRoomTypes`,
    //     icon: <List />,
    //   },
    // ],
  },
  {
    title: "تاریخ های پیک",
    url: `/accommodation/${id}/peakDates`,
    icon: <Calendar/>
  },
];