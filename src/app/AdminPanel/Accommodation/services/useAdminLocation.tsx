import useGetData from "@/services/useGetData";
import type { cities, provience } from "../types";
import {
  accommodation_cities_key,
  accommodation_cities_url,
  accommodation_proviences_key,
  accommodation_proviences_url,
} from "@/data/querykeys";

const useAdminLocation = (province_id?: number) => {
  const getAdminProviences = useGetData<provience[]>({
    key: [accommodation_proviences_key],
    url: accommodation_proviences_url,
  });

  const getAdminCities = useGetData<cities[]>({
    key: [accommodation_cities_key, String(province_id)],
    url: `${accommodation_cities_url}?province_id=${province_id}`,
    enabled: !!province_id,
  });

  return { getAdminProviences, getAdminCities };
};

export default useAdminLocation;
