import { type cities, type provience } from "@/app/AdminPanel/Accommodation/types";
import {
  accommodation_cities_key,
  accommodation_cities_url,
  accommodation_proviences_key,
  accommodation_proviences_url,
} from "@/data/querykeys";
import useGetData from "@/services/useGetData";

const useLocation = (province_id?: number) => {

  const getProviences = useGetData<provience>({
    key: [accommodation_proviences_key],
    url: accommodation_proviences_url,
  });

  const getCities = useGetData<cities>({
    key: [accommodation_cities_key, String(province_id)],
    url: `${accommodation_cities_url}?province_id=${province_id}`
  })

  return {getProviences, getCities};
};

export default useLocation;
