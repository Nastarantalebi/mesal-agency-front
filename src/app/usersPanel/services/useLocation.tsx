
import {
  cities_key,
  cities_url,
  province_key,
  province_url,
} from "@/data/querykeys";
import useGetData from "@/services/useGetData";
import type { TOption2 } from "@/types";

const useLocation = (province_id?: number) => {
  const getProviences = useGetData<TOption2[]>({
    key: [province_key],
    url: province_url,
  });

  const getCities = useGetData<TOption2[]>({
    key: [cities_key, String(province_id)],
    url: `${cities_url}?province_id=${province_id}`,
    enabled: !!province_id,
  });

  return { getProviences, getCities };
};

export default useLocation;
