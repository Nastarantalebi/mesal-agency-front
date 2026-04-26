import type z from "zod";
import type { roomTypeFeatureListValidation } from "../fixtures/Validation";


export interface Props {
  AccommodationId: number;
  RoomTypeId?: number | null;
  RoomTypeName?: string | null;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: string;
}

export type TCreateRoomType = {
  name: string,
  capacity : number | null,
  extraPerson: number | null,
  description: string | null,
  breakfast: boolean | null,
  lunch: boolean | null,
  dinner: boolean | null,
}
export type TRoomTypeResponse = {
  id: number,
  name: string,
  capacity : number | null,
  extraPerson: number | null,
  description: string | null,
  breakfast: boolean | null,
  lunch: boolean | null,
  dinner: boolean | null,
}

export type TCRoomTypeFeature = {
    feature: number[] ;
}
export type TRoomTypeFeatureResponse = {
    id: number;
    feature: {id: number; title: string};
}[]



export type TCRoomTypeImage = {
  image: File;
  main: boolean
}

export type TRoomTypeImageResponse = {
  id: number;
  image: string;
  main: boolean;
}

export type TCRoomTypesRoom = {
  name: string;
  floor: number | null;
  description: string| null;
}

export type TRoomTypeRoomResponse = {
  id: number;
  name: string;
  floor: number | null;
  description: string | null;
}

export type TCPriceRange = {
  normalPrice: number;
  peakPrice: number;
}

export type TCRoomTypePrices = {
  prices: {
    date: string;
    normal_price: number;
    normal_child_price: number;
    peak_price: number;
    peak_child_price: number;
    phone_call_price: boolean;
  }[];
};

export type TRoomTypePricesResponse = {
    date: string;
    normal_price: number;
    normal_child_price: number;
    peak_price: number;
    peak_child_price: number;
    phone_call_price: boolean;
}[];

type Type = {
  id: number;
  name: string;
};

export type RoomItem = {
  id: number;
  type: Type | null;
  name: string;
};

export type TRoomTypeFeatureListForm = z.infer<typeof roomTypeFeatureListValidation>;


export type TCRoomTypeBed = {
  beds: { bed: number; number: number }[];
};

export type TRoomTypeBedResponse = {
    id: number;
    bed: {id: string; name: string}
    number: number
}[]
