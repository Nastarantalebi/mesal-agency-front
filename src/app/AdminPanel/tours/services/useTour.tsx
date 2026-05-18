import useGetData from "@/services/useGetData";
import type { TPaginatedResponse } from "@/types";
import type {
  TtourItems,
} from "../../settings/components/toursTemplate/types/types";
import { adminTour_key, adminTour_url } from "@/data/querykeys";
import usePostData from "@/services/usePostData";
import type {
  TCreateDeparturePlan,
  TCreateTourDeparture,
  TResponseTourDeparture,
} from "../fixtures/validation";
import usePutData from "@/services/usePutData";
import useGetById from "@/services/useGetById";
import type { TSendDeparturePlan } from "../types";

interface Props {
  currentTourPage?: number;
  tourTemplateId?: number | null;
  departureId?: number;
  planId?: number | null;
}

const useTour = ({ currentTourPage, tourTemplateId, departureId, planId }: Props) => {
  const getTours = useGetData<TPaginatedResponse<TtourItems>>({
    key: [adminTour_key, "templates"],
    url: `${adminTour_url}${`?page=${currentTourPage ?? 1}`}`,
  });

  const { mutate: postTourDeparture} =
    usePostData<TCreateTourDeparture>({
      key: [adminTour_key, "templates"],
      url: `${adminTour_url}${tourTemplateId}/departures/`,
    });

  const putTourDeparture = usePutData<TCreateTourDeparture>({
    key: [adminTour_key, "templates"],
    url: `${adminTour_url}${tourTemplateId}/departures/`,
  });

  const getTourDepartureById = useGetById<TResponseTourDeparture>({
    key: [adminTour_key, "templates", String(departureId)],
    url: `${adminTour_url}${tourTemplateId}/departures/${departureId}/`,
  });

  const postDeparturePlans = usePostData<TSendDeparturePlan[]>({
    key: [adminTour_key, "plans"],
    url: `${adminTour_url}${tourTemplateId}/departures/${departureId}/plans/`
  })

  const putDeparturePlan = usePutData<TSendDeparturePlan[]>({
    key: [adminTour_key, "plans"],
    url: `${adminTour_url}${tourTemplateId}/departures/${departureId}/plans/`,
    enabled: !!planId,
  })

  return {
    getTours,
    postTourDeparture,
    putTourDeparture,
    getTourDepartureById,
    postDeparturePlans,
    putDeparturePlan,
  };
};

export default useTour;
