import { beds_key, beds_url, default_key, default_url, features_key, features_url, users_key, users_url } from "@/data/querykeys";
import useGetData from "@/services/useGetData";
import usePostData from "@/services/usePostData";
import type { createUsersList, TBedResponse, TCFeature, TCreateBed, TCreateDefaults, TFeatureResponse, UsersListResponse } from "../types";
import type { TPaginatedResponse } from "@/types";
import useDeleteData from "@/services/useDeleteData";

export const useDefaults = () => {
  
  const getDefaults = useGetData<TCreateDefaults>({
    key: [default_key],
    url: default_url,
  });

  const postDefaults = usePostData<TCreateDefaults>({
    key: [default_key],
    url: default_url,
  });

  return {getDefaults, postDefaults}
}

export const useFeatures = (currentRoomPage?: number, currentAccommodationPage?: number) => {

    const postFeature = usePostData<TCFeature>({
      key: [features_key],
      url: features_url,
    });

    const getRoomTypeFeatures = useGetData<
      TPaginatedResponse<TFeatureResponse>
    >({
      key: [features_key, "roomtype", String(currentRoomPage)],
      url: `${features_url}?page=${currentRoomPage}&type=roomtype`,
      enabled: !!currentAccommodationPage,
    });

    const getAccommodationFeatures= useGetData<
        TPaginatedResponse<TFeatureResponse>
      >({
        key: [features_key, "accommodation", String(currentAccommodationPage)],
        url: `${features_url}?page=${currentAccommodationPage}&type=accommodation`,
        enabled: !!currentAccommodationPage,
    });

    const deleteFeature = useDeleteData({
      key: [features_key],
      url: features_url,
    });

    return { postFeature, getRoomTypeFeatures, getAccommodationFeatures, deleteFeature}

}

export const useBeds = (currentBedPage?: number) => {

  const getBeds = useGetData<TPaginatedResponse<TBedResponse>>({
    key: [beds_key, String(currentBedPage)],
    url: `${beds_url}?page=${currentBedPage}`,
    enabled: !!currentBedPage,
  });

  const deleteBed = useDeleteData({
    key: [beds_key, String(currentBedPage)],
    url: beds_url,
  });

  const postBed = usePostData<TCreateBed>({
    key: [beds_key],
    url: beds_url,
  });

  return { getBeds, deleteBed, postBed }
}

export const useUsers = (mobileInput?: string, staffInput?: boolean, currentPage?: number) => {

  const getUsers = useGetData<TPaginatedResponse<UsersListResponse>>({
  key: [users_key, mobileInput!, String(staffInput)],
  url: `${users_url}${mobileInput || staffInput ? `?mobile__contains=${mobileInput}&is_staff=${staffInput}`: `?page=${currentPage}`}`,
  })
  
  const postUsers = usePostData<createUsersList>({
    key: [users_key],
    url: users_url,
  })

  return { getUsers, postUsers }
}