import { accommodation_url, features_key, features_url } from "@/data/querykeys";
import useDeleteData from "@/services/useDeleteData";
import useGetData from "@/services/useGetData";
import type { TPaginatedResponse } from "@/types";
import type { RoomItem, TCreateRoomType, TCRoomTypeFeature, TCRoomTypesRoom, TRoomTypeFeatureResponse, TRoomTypeImageResponse, TRoomTypeResponse, TRoomTypeRoomResponse } from "../types";
import usePutData from "@/services/usePutData";
import usePostData from "@/services/usePostData";
import type { TFeatureResponse } from "../../settings/types";

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

// ----------------------------------------------------------------------------------------

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

// ----------------------------------------------------------------------------------------

export const useRoomTypeImg = (AccommodationId: number, RoomTypeId: number) => {

  const key = ["RoomType-image", String(RoomTypeId) || ""];
  const url = `${accommodation_url}${AccommodationId}/room_types/${RoomTypeId}/images/`;

  const getImgs = useGetData<
    TPaginatedResponse<TRoomTypeImageResponse>
  >({
    key,
    url,
    enabled: !!RoomTypeId,
  });

  const postImg = usePostData<FormData, any>({
    key,
    url,
  });

  const deleteImg = useDeleteData({
    key,
    url,
  });

  return { getImgs, postImg, deleteImg }
}

// ----------------------------------------------------------------------------------------

export const useRoomTypeFeatures = (AccommodationId: number, RoomTypeId: number, currentRoomTypeFeaturePage: number) => {

    const key = [features_key, String(AccommodationId), String(RoomTypeId)];
    const url = `${accommodation_url}${AccommodationId}/room_types/${RoomTypeId}/features/`;

    const getFeatures = useGetData<
    TPaginatedResponse<TFeatureResponse>
  >({
    key: [features_key, "roomtype", String(currentRoomTypeFeaturePage)],
    url: `${features_url}?page=${currentRoomTypeFeaturePage}&type=roomtype`,
  });

  const getRoomTypeFeatures = useGetData<TRoomTypeFeatureResponse>({
    key,
    url,
    enabled: !!RoomTypeId,
  });

  const postRoomTypeFeatures = usePostData<
    TCRoomTypeFeature,
    TRoomTypeFeatureResponse
  >({
    key,
    url,
  });

  const deleteRoomTypeFeatures = useDeleteData({
    key,
    url,
  });

  return { getFeatures, getRoomTypeFeatures, postRoomTypeFeatures, deleteRoomTypeFeatures }
}

// ----------------------------------------------------------------------------------------

export const useRooms = (AccommodationId: number, RoomTypeId: number) => {

    const key = ["RoomType-rooms", String(RoomTypeId) || ""];
    const url = `${accommodation_url}${AccommodationId}/room_types/${RoomTypeId}/rooms/`;
    
    const postRoom = usePostData<TCRoomTypesRoom, TRoomTypeRoomResponse>({
      key,
      url,
    });

    return { postRoom }
}

// ----------------------------------------------------------------------------------------

export const useRoomList  = (AccommodationId: number, RoomTypeId: number, currentPage:number) => {

  const key = ["RoomType-rooms", String(RoomTypeId) || "", String(currentPage)];

  const getRooms = useGetData<
    TPaginatedResponse<TRoomTypeRoomResponse>
  >({
    key,
    url:`${accommodation_url}${AccommodationId}/room_types/${RoomTypeId}/rooms/?page=${currentPage}`,
  });
  const deleteRoom = useDeleteData({
    key,
    url: `${accommodation_url}${AccommodationId}/room_types/${RoomTypeId}/rooms/`,
  });

  return { getRooms, deleteRoom }

}

