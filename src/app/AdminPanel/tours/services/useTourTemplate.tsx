import useGetData from "@/services/useGetData";
import { adminTour_key, adminTour_url } from "@/data/querykeys";
import usePostData from "@/services/usePostData";
import useGetById from "@/services/useGetById";
import usePutData from "@/services/usePutData";
import type { TPaginatedResponse } from "@/types";
import useDeleteData from "@/services/useDeleteData";
import type { TCreateTourTemplate } from "../fixtures/validation";
import type { TtourTemplateItems, TtourTemplateResponse } from "../types";
import type { TRtourImage } from "../../RoomTypes/types";

interface Props {
  tourId?: string | number | null;
  imageId?: number | null;
  currentTourPage?: number;
  searchInput?: string;
}

const useTourTemplate = ({
  tourId,
  currentTourPage,
  searchInput,
  imageId,
}: Props) => {
  const key = [adminTour_key];

  const getTours = useGetData<TPaginatedResponse<TtourTemplateItems>>({
    key,
    url: `${adminTour_url}${searchInput ? `?title__contains= ${searchInput}` : `?page=${currentTourPage ?? 1}`}`,
  });

  const postTours = usePostData<TCreateTourTemplate>({
    key,
    url: adminTour_url,
  });

  const getTourById = useGetById<TtourTemplateResponse>({
    key: [adminTour_key, String(tourId)],
    url: adminTour_url,
    id: tourId,
    enabled: !!tourId,
  });

  const putTour = usePutData<TCreateTourTemplate>({
    key,
    url: adminTour_url,
    enabled: !!tourId,
  });

  const deleteTour = useDeleteData({
    key,
    url: adminTour_url,
  });

  const postTourImg = usePostData<FormData>({
    key,
    url: `${adminTour_url}${tourId}/images/`,
    enabled: !!tourId,
  });

  const deleteTourImg = useDeleteData({
    key,
    url: `${adminTour_url}${tourId}/images/`,
  });

    const getTourImg = useGetData<TPaginatedResponse<TRtourImage>>({
    key: [adminTour_key, "images"],
    url: `${adminTour_url}${tourId}/images/`,
    enabled: !!tourId
  })
  const getTourImgById = useGetById<TRtourImage>({
    key: [adminTour_key, "images"],
    url: `${adminTour_url}${tourId}/images/`,
    id: imageId,
    enabled: !!tourId && !!imageId,
  });

  return {
    getTours,
    postTours,
    getTourById,
    putTour,
    deleteTour,
    postTourImg,
    deleteTourImg,
    getTourImgById,
    getTourImg,
  };
};

export default useTourTemplate;
