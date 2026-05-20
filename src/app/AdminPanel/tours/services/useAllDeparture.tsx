import { admin_departures_key, admin_departures_url } from "@/data/querykeys";
import useGetData from "@/services/useGetData";
import type { TPaginatedResponse } from "@/types";
import type { TdepartureResponse } from "../types";

const useAllDeparture = () => {
  const getAllTourDepartures = useGetData<
    TPaginatedResponse<TdepartureResponse>
  >({
    key: [admin_departures_key, "departures"],
    url: admin_departures_url,
  });
  return getAllTourDepartures;
};

export default useAllDeparture;
