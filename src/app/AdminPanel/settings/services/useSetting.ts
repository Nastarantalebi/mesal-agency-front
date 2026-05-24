import { admin_news_key, admin_news_url, beds_key, beds_url, default_key, default_url, features_key, features_url, users_key, users_url } from "@/data/querykeys";
import useGetData from "@/services/useGetData";
import usePostData from "@/services/usePostData";
import type { TcreateUsersList, TBedResponse, TCFeature, TCreateBed, TCreateDefaults, TFeatureResponse, TResponseNews, UsersListResponse } from "../types";
import type { TPaginatedResponse } from "@/types";
import useDeleteData from "@/services/useDeleteData";
import usePutData from "@/services/usePutData";
import useGetById from "@/services/useGetById";
import usePatchData from "@/services/usePatchData";

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
/////////////////////////////////////////////////////////////////////

interface useFeatureProps {
  currentRoomPage?: number;
  currentAccommodationPage?: number;
  feature_id?: number | null;
}

export const useFeatures = ({currentRoomPage, currentAccommodationPage, feature_id}: useFeatureProps) => {

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

    const getfeatureData = useGetData({
      key: [features_key, String(feature_id)],
      url: `${features_url}${feature_id}`,
      enabled: !!feature_id,
    })

    const deleteFeature = useDeleteData({
      key: [features_key],
      url: features_url,
    });

    const putFeature = usePutData({
      key: [features_key],
      url: features_url,
    });

    return { postFeature, getRoomTypeFeatures, getAccommodationFeatures, getfeatureData, deleteFeature, putFeature}

}
///////////////////////////////////////////////////////////////////ز

export const useBeds = ({currentBedPage, bedId}: {currentBedPage?: number, bedId?: number| null}) => {

  const getBeds = useGetData<TPaginatedResponse<TBedResponse>>({
    key: [beds_key, String(currentBedPage)],
    url: `${beds_url}?page=${currentBedPage}`,
    enabled: !!currentBedPage,
  });

  const deleteBed = useDeleteData({
    key: [beds_key, String(currentBedPage)],
    url: beds_url,
  });

  const getBed = useGetData
  ({
    key: [beds_key],
    url: `${beds_url}${bedId}`,
    enabled: !!bedId,
  })

  const postBed = usePostData<TCreateBed>({
    key: [beds_key],
    url: beds_url,
  });

  const putBed = usePutData<TCreateBed>({
    key: [beds_key],
    url: `${beds_url}`,
    enabled: !!bedId,
  })

  return { getBeds, deleteBed, getBed, postBed, putBed }
}

///////////////////////////////////////////////////////////////////////

export const useUsers = (filters?: TcreateUsersList, currentPage?: number) => {
  
  const url = `${users_url}?page=${currentPage}${filters?.is_staff === false ?'' : `&is_staff=${filters?.is_staff}`}${filters?.mobile ? `&mobile__contains=${filters.mobile}` : ''}`

  const getUsers = useGetData<TPaginatedResponse<UsersListResponse>>({
  key: [users_key, String(filters?.is_staff), filters?.mobile!],
  url,
  })
  
  const postUsers = usePostData<TcreateUsersList>({
    key: [users_key],
    url: users_url,
  })
  const putUser = usePutData<TcreateUsersList>({
    key: [users_key],
    url: users_url,
  })

  return { getUsers, postUsers, putUser }
}

/////////////////////////////////////////////////////////////
export const useNews = ({currentPage, id}: {currentPage?: number, id?: number}) => {
  const url = `${admin_news_url}?page=${currentPage}`

  const getNews = useGetData<TPaginatedResponse<TResponseNews>>({
    key: [admin_news_key, currentPage],
    url,
    enabled: !!currentPage,
  })

  const postNews = usePostData<FormData>({
    key: [admin_news_key],
    url: admin_news_url,
  })

  const deletNews = useDeleteData({
    key: [admin_news_key],
    url: admin_news_url,
  })

  const getNewsById = useGetById<TResponseNews>({
    key: [admin_news_key],
    url: admin_news_url,
    id: id,
    enabled: !!id,
  })

  const patchNews = usePatchData<FormData>({
    key: [admin_news_key],
    url: admin_news_url,
  })

  return {getNews, postNews, deletNews, getNewsById, patchNews}

} 

