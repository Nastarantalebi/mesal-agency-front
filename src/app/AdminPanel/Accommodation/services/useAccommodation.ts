import { admin_accommodation_key, accommodation_types_key, accommodation_types_url, admin_accommodation_url, features_key, features_url } from "@/data/querykeys";
import useDeleteData from "@/services/useDeleteData";
import useGetData from "@/services/useGetData";
import usePostData from "@/services/usePostData";
import type { TPaginatedResponse } from "@/types";
import type { AccommodationItem, accommodationTypes, TAccommodationFeatureResponse, TAccommodationImage, TAccommodationImageResponse, TAccommodationResponse, TCAccommodationFeature, TCreateAccomodation, TFeatureResponse } from "../types";
import usePutData from "@/services/usePutData";

export const useAccommodation = (AccommodationId?: number, currentAccommodationPage?: number, searchInput?: string) => {

  const key = [admin_accommodation_key, String(AccommodationId)];
  const url =  `${admin_accommodation_url}${AccommodationId}/`

    const getAccommodation = useGetData<TAccommodationResponse>({
        key,
        url,
        enabled: !!AccommodationId,
    });

    const postAccommodation = usePostData<
        TCreateAccomodation
    >({
        key: [admin_accommodation_key],
        url: admin_accommodation_url,
    });

    const putAccommodation = usePutData<
        TCreateAccomodation
    >({
        key,
        url: admin_accommodation_url,
    });

    const deleteAccommodation = useDeleteData({
      key: [admin_accommodation_key],
      url: admin_accommodation_url,
    });

    const getAccommodations = useGetData<
      TPaginatedResponse<AccommodationItem>
    >({
      key: [admin_accommodation_key, String(currentAccommodationPage), searchInput!],
      url: `${admin_accommodation_url}${searchInput ? `?name__contains= ${searchInput}`: `?page=${currentAccommodationPage}`}`,
      enabled: !!currentAccommodationPage
    });

    const getAccommodationTypes = useGetData<accommodationTypes[]>({
      key: [accommodation_types_key],
      url: accommodation_types_url,
    })


    return { getAccommodation, postAccommodation, putAccommodation, deleteAccommodation, getAccommodations, getAccommodationTypes}
}

// -----------------------------------------------------------------------------------------

export const useAccommodationFeatures = (AccommodationId?: number) => {

    const key = ["accommodation-features", String(AccommodationId)];
      const url = `${admin_accommodation_url}${AccommodationId}/features/`;
    
      const accommodationFeatures = useGetData<
        TPaginatedResponse<TFeatureResponse>
      >({
        key: [features_key, String(AccommodationId)],
        url: `${features_url}?type=accommodation`,
      });
    
      const accommodationFeatureList = useGetData<
        TPaginatedResponse<TAccommodationFeatureResponse>
      >({
        key,
        url,
        enabled: !!AccommodationId,
      });
    
      const postAccommodationFeatures = usePostData<
        TCAccommodationFeature
      >({
        key,
        url,
      });
    
      const deleteAccommodatioFeature = useDeleteData({
        key,
        url,
      });

      return { accommodationFeatures, accommodationFeatureList, postAccommodationFeatures, deleteAccommodatioFeature}
    
}

// -----------------------------------------------------------------------------------------

export const useAccommodationImg = (AccommodationId?: number) => {

    const key = ["accommodation-image", String(AccommodationId)];
    const url = `${admin_accommodation_url}${AccommodationId}/images/`;
    
    const getImgs = useGetData<
        TPaginatedResponse<TAccommodationImageResponse>
    >({
        key,
        url,
        gcTime: 30 * 60 * 1000, // 30 دقیقه (قبلاً cacheTime بود)
        staleTime: 5 * 60 * 1000, // 5 دقیقه - داده fresh باقی بمونه
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });

    const postImg = usePostData<TAccommodationImage>({
        key,
        url,
    });

    const deleteImg = useDeleteData({
        key,
        url,
    });

    return { getImgs, postImg, deleteImg }
}