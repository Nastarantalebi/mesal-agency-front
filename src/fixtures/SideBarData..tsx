import {
  Settings,
  Newspaper,
  TentTreeIcon,
  Home,
  UserRoundSearchIcon,
  Settings2,
  Bed,
  Star,
} from "lucide-react";

export const SidebarData = [
  {
    title: "لیست اقامتگاه ها",
    url: `/admin/accommodations/`,
    icon: <Home />,
  },
  {
    title: "لیست تمپلیت تور ها",
    url: `/admin/tourTemplates/`,
    icon: <TentTreeIcon />,
  },
  {
    title: "اخبار",
    url: `/admin/news`,
    icon: <Newspaper />,
  },
  {
    title: "کاربران",
    url: `/admin/users/`,
    icon: <UserRoundSearchIcon />,
  },
  {
    title: "تنظیمات سامانه",
    url: `/admin/setting/`,
    icon: <Settings />,
    children: [
      {
        title: "ویژگی های اقامتگاه",
        url: `/admin/setting/accommodationFeatures/`,
        icon: <Star />,
      },
      {
        title: "نوع تخت ",
        url: `/admin/setting/BedTypes/`,
        icon: <Bed />,
      },
      {
        title: "پیشفرض ها",
        url: `/admin/setting/defaults/`,
        icon: <Settings2 />,
      },
    ],
  },
];
