import useGetData from "@/services/useGetData";
import type { TPaginatedResponse } from "@/types";
import { adminTour_key, adminTour_url } from "@/data/querykeys";
import type { TtourTemplateItems } from "../types";

interface Props {
  currentTourPage?: number;
}

const useTour = ({ currentTourPage }: Props) => {
  const getTours = useGetData<TPaginatedResponse<TtourTemplateItems>>({
    key: [adminTour_key, "templates"],
    url: `${adminTour_url}${`?page=${currentTourPage ?? 1}`}`,
  });

  return {
    getTours,
  };
};

export default useTour;
