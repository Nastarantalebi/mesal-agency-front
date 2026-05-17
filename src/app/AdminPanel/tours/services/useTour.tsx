import useGetData from "@/services/useGetData";
import type { TPaginatedResponse } from "@/types";
import type {
  TtourItems,
  TtourResponse,
} from "../../settings/components/toursTemplate/types/types";
import { adminTour_key, adminTour_url } from "@/data/querykeys";
import usePostData from "@/services/usePostData";
import type {
  TCreateAdditionalTour,
  TResponseAdditionalTour,
} from "../fixtures/validation";
import usePutData from "@/services/usePutData";
import useGetById from "@/services/useGetById";

interface Props {
  currentTourPage?: number;
  tourTemplateId: number;
  departureId?: number;
}

const useTour = ({ currentTourPage, tourTemplateId, departureId }: Props) => {
  const getTours = useGetData<TPaginatedResponse<TtourItems>>({
    key: [adminTour_key, "templates"],
    url: `${adminTour_url}${`?page=${currentTourPage ?? 1}`}`,
  });

  const postTourDeparture = usePostData<TCreateAdditionalTour>({
    key: [adminTour_key, "templates"],
    url: `${adminTour_url}${tourTemplateId}/departures/`,
  });

  const putTourDeparture = usePutData<TCreateAdditionalTour>({
    key: [adminTour_key, "templates"],
    url: `${adminTour_url}${tourTemplateId}/departures/`,
  });

  const getTourDepartureById = useGetById<TResponseAdditionalTour>({
    key: [adminTour_key, "templates", String(departureId)],
    url: `${adminTour_url}${tourTemplateId}/departures/${departureId}/`,
  });

  return {
    getTours,
    postTourDeparture,
    putTourDeparture,
    getTourDepartureById,
  };
};

export default useTour;
