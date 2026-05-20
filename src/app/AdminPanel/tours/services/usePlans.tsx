import usePostData from "@/services/usePostData";
import type {
  TsendDeparturePlan,
  TtourPlanResponse,
} from "../fixtures/validation";
import { adminTour_key, adminTour_url } from "@/data/querykeys";
import usePutData from "@/services/usePutData";
import useGetData from "@/services/useGetData";
import type { TPaginatedResponse } from "@/types";
import useDeleteData from "@/services/useDeleteData";

interface Props {
  currentTourPage?: number;
  tourTemplateId: number | null;
  departureId: number;
  planId?: number;
}

const usePlans = ({ tourTemplateId, departureId, planId }: Props) => {
  const postDeparturePlans = usePostData<TsendDeparturePlan[]>({
    key: [adminTour_key, "plans"],
    url: `${adminTour_url}${tourTemplateId}/departures/${departureId}/plans/`,
  });

  const putDeparturePlan = usePutData<TsendDeparturePlan[]>({
    key: [adminTour_key, "plans"],
    url: `${adminTour_url}${tourTemplateId}/departures/${departureId}/plans/`,
    enabled: !!planId,
  });

  const getDeparturePlans = useGetData<TPaginatedResponse<TtourPlanResponse>>({
    key: [adminTour_key, "plans", String(tourTemplateId), String(departureId)],
    url: `${adminTour_url}${tourTemplateId}/departures/${departureId}/plans/`,
    enabled: !!tourTemplateId && !!departureId,
  });

  const deleteDeparturePlans = useDeleteData({
    key: [adminTour_key, "plans"],
    url: `${adminTour_url}${tourTemplateId}/departures/${departureId}/plans/`,
  });
  return {
    postDeparturePlans,
    putDeparturePlan,
    getDeparturePlans,
    deleteDeparturePlans,
  };
};

export default usePlans;
