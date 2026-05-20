import usePostData from "@/services/usePostData";
import type {
  TsendDeparturePlan,
  TtourPlanResponse,
} from "../fixtures/validation";
import { adminTour_key, adminTour_url } from "@/data/querykeys";
import useGetData from "@/services/useGetData";
import type { TPaginatedResponse } from "@/types";
import useDeleteData from "@/services/useDeleteData";
import useGetById from "@/services/useGetById";
import usePutData from "@/services/usePutData";
import usePatchData from "@/services/usePatchData";

interface Props {
  currentTourPage?: number;
  tourTemplateId: number | null;
  departureId?: number;
  planId?: number;
}

const usePlans = ({ tourTemplateId, departureId, planId }: Props) => {
  const url = `${adminTour_url}${tourTemplateId}/departures/${departureId}/plans/`;
  const key = [
    adminTour_key,
    "plans",
    String(tourTemplateId),
    String(departureId),
  ];

  const postDeparturePlans = usePostData<TsendDeparturePlan[]>({
    key,
    url,
    enabled: !!tourTemplateId && !!departureId,
  });

  const getDeparturePlans = useGetData<TPaginatedResponse<TtourPlanResponse>>({
    key,
    url,
    enabled: !!tourTemplateId && !!departureId,
  });

  const deleteDeparturePlans = useDeleteData({
    key,
    url,
  });

  const getPlanById = useGetById<TsendDeparturePlan>({
    key: [
      adminTour_key,
      "plans",
      String(tourTemplateId),
      String(departureId),
      String(planId),
    ],
    url,
    id: planId,
    enabled: !!planId,
  });

  const putPlan = usePutData<TsendDeparturePlan>({
    key,
    url,
    enabled: !!planId,
  });

  const patchPlan = usePatchData<TsendDeparturePlan>({
    key,
    url,
    enabled: !!planId,
  });

  const postPlan = usePostData<TsendDeparturePlan[]>({
    key,
    url,
    enabled: !!tourTemplateId && !!departureId,
  });

  return {
    postDeparturePlans,
    getDeparturePlans,
    deleteDeparturePlans,
    getPlanById,
    putPlan,
    postPlan,
    patchPlan,
  };
};

export default usePlans;
