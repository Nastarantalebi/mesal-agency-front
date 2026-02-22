export type TCRoomTypeBed = {
  beds: { bed: number; number: number }[];
};

export type TRoomTypeBedResponse = {
    id: number;
    bed: {id: string; name: string}
    number: number
}[]