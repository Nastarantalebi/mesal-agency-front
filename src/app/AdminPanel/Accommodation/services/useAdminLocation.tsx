import useGetData from "@/services/useGetData";
import {
  accommodation_cities_key,
  accommodation_cities_url,
  accommodation_proviences_key,
  accommodation_proviences_url,
} from "@/data/querykeys";
import type { TOption2 } from "@/types";

const useAdminLocation = (province_id?: number) => {
  const getAdminProviences = useGetData<TOption2[]>({
    key: [accommodation_proviences_key],
    url: accommodation_proviences_url,
  });

  const getAdminCities = useGetData<TOption2[]>({
    key: [accommodation_cities_key, String(province_id)],
    url: `${accommodation_cities_url}?province_id=${province_id}`,
    enabled: !!province_id,
  });

  return { getAdminProviences, getAdminCities };
};

export default useAdminLocation;
