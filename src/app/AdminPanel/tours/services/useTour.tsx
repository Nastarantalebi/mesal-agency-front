import useGetData from "@/services/useGetData";
import type { TPaginatedResponse } from "@/types";
import { adminTour_key, adminTour_url } from "@/data/querykeys";
import usePostData from "@/services/usePostData";
import type {
  TCreateTourDeparture,
  TResponseTourDeparture,
  TsendDeparturePlan,
} from "../fixtures/validation";
import usePutData from "@/services/usePutData";
import useGetById from "@/services/useGetById";
import useDeleteData from "@/services/useDeleteData";
import type { TtourTemplateItems } from "../types";

interface Props {
  currentTourPage?: number;
  tourTemplateId?: number | null;
  departureId?: number;
  planId?: number | null;
}

const useTour = ({
  currentTourPage,
  tourTemplateId,
  departureId,
  planId,
}: Props) => {
  const getTours = useGetData<TPaginatedResponse<TtourTemplateItems>>({
    key: [adminTour_key, "templates"],
    url: `${adminTour_url}${`?page=${currentTourPage ?? 1}`}`,
  });

  const getTourDeprtures = useGetData<
    TPaginatedResponse<TResponseTourDeparture>
  >({
    key: [adminTour_key, "departures"],
    url: `${adminTour_url}${tourTemplateId}/departures/`,
  });

  const deleteTourDeparture = useDeleteData({
    key: [adminTour_key, "departures"],
    url: `${adminTour_url}${tourTemplateId}/departures/${departureId}`,
  });

  const { mutate: postTourDeparture } = usePostData<TCreateTourDeparture>({
    key: [adminTour_key, "departures"],
    url: `${adminTour_url}${tourTemplateId}/departures/`,
  });

  const putTourDeparture = usePutData<TCreateTourDeparture>({
    key: [adminTour_key, "departures"],
    url: `${adminTour_url}${tourTemplateId}/departures/`,
  });

  const getTourDepartureById = useGetById<TResponseTourDeparture>({
    key: [adminTour_key, "departures", String(departureId)],
    url: `${adminTour_url}${tourTemplateId}/departures/${departureId}/`,
  });

  const postDeparturePlans = usePostData<TsendDeparturePlan[]>({
    key: [adminTour_key, "plans"],
    url: `${adminTour_url}${tourTemplateId}/departures/${departureId}/plans/`,
  });

  const putDeparturePlan = usePutData<TsendDeparturePlan[]>({
    key: [adminTour_key, "plans"],
    url: `${adminTour_url}${tourTemplateId}/departures/${departureId}/plans/`,
    enabled: !!planId,
  });

  return {
    getTours,
    postTourDeparture,
    getTourDeprtures,
    deleteTourDeparture,
    putTourDeparture,
    getTourDepartureById,
    postDeparturePlans,
    putDeparturePlan,
  };
};

export default useTour;
