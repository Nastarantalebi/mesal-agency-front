import { Bus, Car, Globe, Hotel, PlaneIcon, Train, Trees } from "lucide-react";
import type { TData } from "../types";

export const data: TData = {
  services: {
    data: [
      { name: "پرواز", icon: <PlaneIcon /> },
      { name: "هتل", icon: <Hotel /> },
      { name: "بومگردی", icon: <Trees /> },
      { name: "قطار", icon: <Train /> },
      { name: "اتوبوس", icon: <Bus /> },
      { name: "ترانسفر", icon: <Car /> },
      { name: "ویزا", icon: <Globe /> },
    ],
  },
};
