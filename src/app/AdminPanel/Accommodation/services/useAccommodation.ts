import { accommodation_key, accommodation_url, features_key, features_url } from "@/data/querykeys";
import useDeleteData from "@/services/useDeleteData";
import useGetData from "@/services/useGetData";
import usePostData from "@/services/usePostData";
import type { TPaginatedResponse } from "@/types";
import type { AccommodationItem, TAccommodationFeatureResponse, TAccommodationImageResponse, TAccommodationResponse, TCAccommodationFeature, TCreateAccomodation, TFeatureResponse } from "../types";
import usePutData from "@/services/usePutData";

export const useAccommodation = (AccommodationId?: number, currentAccommodationPage?: number) => {

  const key = [accommodation_key, String(AccommodationId)];
  const url =  `${accommodation_url}${AccommodationId}/`

    const getAccommodation = useGetData<TAccommodationResponse>({
        key,
        url,
        enabled: !!AccommodationId,
    });

    const postAccommodation = usePostData<
        TCreateAccomodation,
        TAccommodationResponse
    >({
        key: [accommodation_key],
        url: accommodation_url,
    });

    const putAccommodation = usePutData<
        TCreateAccomodation,
        TAccommodationResponse
    >({
        key,
        url,
    });

    const deleteAccommodation = useDeleteData({
      key: [accommodation_key],
      url: `${accommodation_url}`,
    });

    const getAccommodations = useGetData<
      TPaginatedResponse<AccommodationItem>
    >({
      key: [accommodation_key, String(currentAccommodationPage)],
      url: `${accommodation_url}?page=${currentAccommodationPage}`,
      enabled: !!currentAccommodationPage
    });

    return { getAccommodation, postAccommodation, putAccommodation, deleteAccommodation, getAccommodations}
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