import useGetData from "@/services/useGetData";
import { adminTour_key, adminTour_url } from "@/data/querykeys";
import usePostData from "@/services/usePostData";
import useGetById from "@/services/useGetById";
import usePutData from "@/services/usePutData";
import type { TPaginatedResponse } from "@/types";
import useDeleteData from "@/services/useDeleteData";
import type { TCreateTourTemplate } from "../fixtures/validation";
import type { TtourTemplateItems, TtourTemplateResponse } from "../types";

interface Props {
  tourId?: string | number | null;
  currentTourPage?: number;
  searchInput?: string;
}

const useTourTemplate = ({ tourId, currentTourPage, searchInput }: Props) => {
  console.log("currentTourPage:", currentTourPage);

  const getTours = useGetData<TPaginatedResponse<TtourTemplateItems>>({
    key: [adminTour_key],
    url: `${adminTour_url}${searchInput ? `?title__contains= ${searchInput}` : `?page=${currentTourPage ?? 1}`}`,
  });

  const postTours = usePostData<TCreateTourTemplate>({
    key: [adminTour_key],
    url: adminTour_url,
  });

  const getTourById = useGetById<TtourTemplateResponse>({
    key: [adminTour_key, String(tourId)],
    url: adminTour_url,
    id: tourId,
    enabled: !!tourId,
  });

  const putTour = usePutData<TCreateTourTemplate>({
    key: [adminTour_key],
    url: adminTour_url,
    enabled: !!tourId,
  });

  const deleteTour = useDeleteData({
    key: [adminTour_key],
    url: adminTour_url,
  });
  return { getTours, postTours, getTourById, putTour, deleteTour };
};

export default useTourTemplate;
