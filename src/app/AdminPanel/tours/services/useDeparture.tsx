import { admin_departures_key, admin_departures_url } from "@/data/querykeys";
import useGetData from "@/services/useGetData";
import type { TPaginatedResponse } from "@/types";
import type { TdepartureResponse } from "../types";

const useDeparture = () => {
  const getDepartures  = useGetData<TPaginatedResponse<TdepartureResponse>>({
    key: [admin_departures_key],
    url: admin_departures_url,
  });
  return getDepartures;
};

export default useDeparture;
