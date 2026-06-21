import type { TPaginatedResponse } from "@/types";
import type {
  TCreateTourDeparture,
  TResponseTourDeparture,
} from "../fixtures/validation";
import useGetData from "@/services/useGetData";
import { adminTour_key, adminTour_url } from "@/data/querykeys";
import useDeleteData from "@/services/useDeleteData";
import usePostData from "@/services/usePostData";
import usePutData from "@/services/usePutData";
import useGetById from "@/services/useGetById";

interface Props {
  tourTemplateId?: number | null;
  departureId?: number;
}

const useDeparture = ({ tourTemplateId, departureId }: Props) => {
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

  const postTourDeparture = usePostData<TCreateTourDeparture>({
    key: [adminTour_key, "departures"],
    url: `${adminTour_url}${tourTemplateId}/departures/`,
  });

  const putTourDeparture = usePutData<TCreateTourDeparture>({
    key: [adminTour_key, "departures"],
    url: `${adminTour_url}${tourTemplateId}/departures/`,
  });

  const getTourDepartureById = useGetById<TResponseTourDeparture>({
    key: [
      adminTour_key,
      "departures",
      String(departureId),
      String(tourTemplateId),
    ],
    url: `${adminTour_url}${tourTemplateId}/departures/${departureId}/`,
    enabled: !!departureId,
  });
  return {
    getTourDeprtures,
    deleteTourDeparture,
    postTourDeparture,
    putTourDeparture,
    getTourDepartureById,
  };
};

export default useDeparture;
