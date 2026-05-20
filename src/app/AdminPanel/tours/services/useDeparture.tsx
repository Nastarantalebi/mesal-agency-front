import { admin_departures_url, adminTour_key } from "@/data/querykeys";
import useGetData from "@/services/useGetData";
import type { TPaginatedResponse } from "@/types";
import type { TdepartureResponse } from "../types";

const useDeparture = () => {
  const getDepartures  = useGetData<TPaginatedResponse<TdepartureResponse>>({
    key: [adminTour_key, "departures"],
    url: admin_departures_url,
  });
  return getDepartures;
};

export default useDeparture;
