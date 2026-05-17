import useGetData from "@/services/useGetData";
import type { TPaginatedResponse } from "@/types";
import type {
  TtourItems,
  TtourResponse,
} from "../../settings/components/toursTemplate/types/types";
import { adminTour_key, adminTour_url } from "@/data/querykeys";

interface Props {
  currentTourPage?: number;
}

const useTour = ({ currentTourPage }: Props) => {
  const getTours = useGetData<TPaginatedResponse<TtourItems>>({
    key: [adminTour_key, "templates"],
    url: `${adminTour_url}${`?page=${currentTourPage ?? 1}`}`,
  });
  return {getTours};
};

export default useTour;
