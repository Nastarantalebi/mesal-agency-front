import { accommodation_key, accommodation_url, features_key, features_url } from "@/data/querykeys";
import useDeleteData from "@/services/useDeleteData";
import useGetData from "@/services/useGetData";
import usePostData from "@/services/usePostData";
import type { TPaginatedResponse } from "@/types";
import type { TAccommodationFeatureResponse, TAccommodationImageResponse, TAccommodationResponse, TCAccommodationFeature, TFeatureResponse } from "../types";

export const useAccommodation = (AccommodationId : number) => {

    const getAccommodation = useGetData<TAccommodationResponse>({
        key: [accommodation_key, String(AccommodationId)],
        url: `${accommodation_url}${AccommodationId}/`,
        enabled: !!AccommodationId,
    });

    return getAccommodation
}

// -----------------------------------------------------------------------------------------

export const useAccommodationFeatures = (AccommodationId: number) => {

    const key = ["accommodation-features", String(AccommodationId)];
      const url = `${accommodation_url}${AccommodationId}/features/`;
    
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
        TCAccommodationFeature,
        TAccommodationFeatureResponse
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

export const useAccommodationImg = (AccommodationId: number) => {

    const key = ["accommodation-image", String(AccommodationId)];
    const url = `${accommodation_url}${AccommodationId}/images/`;
    
    const getImgs = useGetData<
        TPaginatedResponse<TAccommodationImageResponse>
    >({
        key,
        url,
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