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
    id: string;
    feature: {id: string; title: string};
}[]



export type TCRoomTypeImage = {
  image: string;
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
    adult_normal_price: number;
    adult_peak_price: number;
    child_normal_price: number;
    child_peak_price: number;
  }[];
};
export type TRoomTypePricesResponse = {
    date: string ;
    adult_normal_price: number;
    adult_peak_price: number;
    child_normal_price: number;
    child_peak_price: number;
}[]
