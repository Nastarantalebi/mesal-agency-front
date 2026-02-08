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

