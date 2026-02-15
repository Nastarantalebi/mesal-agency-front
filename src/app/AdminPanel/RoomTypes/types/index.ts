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

export type TCRoomTypeBed = {
    beds: number[] ;
}

export type TRoomTypeBedResponse = {
    id: string;
    bed: {id: string; name: string}
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
