import { accommodation_url, beds_key, beds_url, features_key, features_url } from "@/data/querykeys";
import useDeleteData from "@/services/useDeleteData";
import useGetData from "@/services/useGetData";
import type { TPaginatedResponse } from "@/types";
import type { RoomItem, TCreateRoomType, TCRoomTypeBed, TCRoomTypeFeature, TCRoomTypePrices, TCRoomTypesRoom, TRoomTypeBedResponse, TRoomTypeFeatureResponse, TRoomTypeImageResponse, TRoomTypePricesResponse, TRoomTypeResponse, TRoomTypeRoomResponse } from "../types";
import usePutData from "@/services/usePutData";
import usePostData from "@/services/usePostData";
import type { TBedResponse, TFeatureResponse } from "../../settings/types";

export const useRoomType = (AccommodationId: number | undefined, RoomTypeId: number) => {

    const key = ["RoomTypes", String(AccommodationId) || ""];
    const url = `${accommodation_url}${AccommodationId}/room_types/`;

    const getRoomType = useGetData<TRoomTypeResponse>({
        key: [...key, String(RoomTypeId) || ""],
        url: `${url}${RoomTypeId}`,
        enabled: !!RoomTypeId,
        });
  
    const putRoomType = usePutData<TCreateRoomType>({
        key,
        url: `${url}${RoomTypeId}`,
    });

    const postRoomType = usePostData<TCreateRoomType>({
        key,
        url,
    });

    return { getRoomType, putRoomType, postRoomType};
  
}

// ----------------------------------------------------------------------------------------

export const useRoomTypeList = (AccommodationId: number, currentPage: number, searchInput?: string) => {

    const getRoomTypeList = useGetData<TPaginatedResponse<RoomItem>>({
        key: ["RoomTypes", String(AccommodationId), String(currentPage), searchInput!],
        url: `${accommodation_url}${AccommodationId}/room_types/${searchInput ? `?name__contains=${searchInput}` : `?page=${currentPage}`}`
    });

    const deleteRoomType = useDeleteData({
        key: ["RoomTypes", String(AccommodationId)],
        url: `${accommodation_url}${AccommodationId}/room_types/`,
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

  const postImg = usePostData<FormData>({
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
    TCRoomTypeFeature
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
    
    const postRoom = usePostData<TCRoomTypesRoom>({
      key,
      url,
    });

    return { postRoom }
}

// ----------------------------------------------------------------------------------------

export const useRoomList  = (AccommodationId: number, RoomTypeId: number, currentPage:number, searchInput?: string) => {


  const getRooms = useGetData<
    TPaginatedResponse<TRoomTypeRoomResponse>
  >({
    key: ["RoomType-rooms", String(RoomTypeId), String(currentPage), searchInput!],
    url:`${accommodation_url}${AccommodationId}/room_types/${RoomTypeId}/rooms/${searchInput ? `?name__contains=${searchInput}` : `?page=${currentPage}`}`,
  });

  const deleteRoom = useDeleteData({
    key: ["RoomType-rooms", String(RoomTypeId), String(currentPage)],
    url: `${accommodation_url}${AccommodationId}/room_types/${RoomTypeId}/rooms/`,
  });

  return { getRooms, deleteRoom }

}

// ----------------------------------------------------------------------------------------

export const useRoomTypeBed = (AccommodationId: number, RoomTypeId: number) => {
  
  const key = [beds_key, String(AccommodationId), String(RoomTypeId)];
    const url = `${accommodation_url}${AccommodationId}/room_types/${RoomTypeId}/beds/`;

    const getbeds = useGetData<TPaginatedResponse<TBedResponse>>({
      key: [beds_key],
      url: `${beds_url}`,
    });

    const getRoomTypeBeds =
      useGetData<TRoomTypeBedResponse>({
        key,
        url,
        enabled: !!RoomTypeId,
      });

    const postRoomTypeBeds = usePostData<TCRoomTypeBed>({
      key,
      url,
    });

    return { getbeds, getRoomTypeBeds, postRoomTypeBeds }
}

// ----------------------------------------------------------------------------------------

export const useRoomTypePrice = (AccommodationId: number, RoomTypeId: number, startDate: string, endDate: string) => {

  const key = ["roomTypePrices", startDate, endDate];
  const url = `${accommodation_url}${AccommodationId}/room_types/${RoomTypeId}/prices/?start_date=${startDate}&end_date=${endDate}`
  
  const getRoomTypePrices = useGetData<TRoomTypePricesResponse>({
    key,
    url,
    enabled: !!RoomTypeId && !!startDate && !!endDate,
  });
  
  const postRoomTypePrices = usePostData<
      TCRoomTypePrices
    >({
      key,
      url,
    });

    return { getRoomTypePrices, postRoomTypePrices }
}



