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
    enabled: !!tourTemplateId,
  });

  const deleteTourDeparture = useDeleteData({
    key: [adminTour_key, "departures"],
    url: `${adminTour_url}${tourTemplateId}/departures/`,
  });

  const { mutate: postTourDeparture, isPending:isPendingDeparture } = usePostData<TCreateTourDeparture>({
    key: [adminTour_key, "departures"],
    url: `${adminTour_url}${tourTemplateId}/departures/`,
  });

  const putTourDeparture = usePutData<TCreateTourDeparture>({
    key: [adminTour_key, "departures"],
    url: `${adminTour_url}${tourTemplateId}/departures/`,
  });

  const getTourDepartureById = useGetById<TResponseTourDeparture>({
    key: [adminTour_key, "departures", String(departureId), String(tourTemplateId)],
    url: `${adminTour_url}${tourTemplateId}/departures/${departureId}/`,
    enabled: !!departureId
  });

  const {mutate:postDeparturePlans, isPending:isPendingDepaturePlan} = usePostData<TsendDeparturePlan[]>({
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
    isPendingDeparture,
    getTourDeprtures,
    deleteTourDeparture,
    putTourDeparture,
    getTourDepartureById,
    postDeparturePlans,
    isPendingDepaturePlan,
    putDeparturePlan,
  };
};

export default useTour;
