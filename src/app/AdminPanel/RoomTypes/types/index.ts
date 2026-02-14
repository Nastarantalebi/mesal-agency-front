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
    beds: {id: string; name: string}
}[]


