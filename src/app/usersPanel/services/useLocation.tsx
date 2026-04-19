import {
  type cities,
  type provience,
} from "@/app/AdminPanel/Accommodation/types";
import {
  cities_key,
  cities_url,
  province_key,
  province_url,
} from "@/data/querykeys";
import useGetData from "@/services/useGetData";

const useLocation = (province_id?: number) => {
  const getProviences = useGetData<provience[]>({
    key: [province_key],
    url: province_url,
  });

  const getCities = useGetData<cities[]>({
    key: [cities_key, String(province_id)],
    url: `${cities_url}?province_id=${province_id}`,
  });

  return { getProviences, getCities };
};

export default useLocation;
