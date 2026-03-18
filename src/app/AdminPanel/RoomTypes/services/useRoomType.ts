import { accommodation_url } from "@/data/querykeys";
import useDeleteData from "@/services/useDeleteData";
import useGetData from "@/services/useGetData";
import type { TPaginatedResponse } from "@/types";
import type { RoomItem, TCreateRoomType, TRoomTypeResponse } from "../types";
import usePutData from "@/services/usePutData";
import usePostData from "@/services/usePostData";

export const useRoomType = (AccommodationId: number | undefined, RoomTypeId: number) => {

    const key = ["RoomTypes", String(AccommodationId) || ""];
    const url = `${accommodation_url}${AccommodationId}/room_types/`;

    const getRoomType = useGetData<TRoomTypeResponse>({
        key: [...key, String(RoomTypeId) || ""],
        url: `${url}${RoomTypeId}`,
        enabled: !!RoomTypeId,
        });
  
    const putRoomType = usePutData<TCreateRoomType, TRoomTypeResponse>({
        key,
        url: `${url}${RoomTypeId}`,
    });

    const postRoomType = usePostData<TCreateRoomType, TRoomTypeResponse>({
        key,
        url,
    });

    return { getRoomType, putRoomType, postRoomType};
  
}

export const useRoomTypeList = (AccommodationId: number) => {

    const key = ["RoomTypes", String(AccommodationId) || ""];
    const url = `${accommodation_url}${AccommodationId}/room_types/`;

    const getRoomTypeList = useGetData<TPaginatedResponse<RoomItem>>({
        key,
        url,
    });

    const deleteRoomType = useDeleteData({
        key,
        url,
    });

    return {getRoomTypeList, deleteRoomType}
}