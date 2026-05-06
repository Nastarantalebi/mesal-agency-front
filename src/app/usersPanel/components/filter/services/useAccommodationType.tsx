import type { accommodationTypes } from "@/app/AdminPanel/Accommodation/types";
import {
  accommodationTypes_key,
  accommodationTypes_url,
} from "@/data/querykeys";
import useGetData from "@/services/useGetData";

const useAccommodationType = () => {
  const accommodationTypes = useGetData<accommodationTypes[]>({
    key: [accommodationTypes_key],
    url: accommodationTypes_url,
  });
  return { accommodationTypes };
};

export default useAccommodationType;
