import useGetData from "@/services/useGetData";
import type { TPaginatedResponse } from "@/types";
import { adminTour_key, adminTour_url } from "@/data/querykeys";
import type { TtourTemplateItems } from "../types";

const useTour = () => {
  const getTours = useGetData<TPaginatedResponse<TtourTemplateItems>>({
    key: [adminTour_key, "templates"],
    url: `${adminTour_url}`,
  });

  return {
    getTours,
  };
};

export default useTour;
