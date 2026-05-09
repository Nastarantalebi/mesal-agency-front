import type { accommodationTypes } from "@/app/AdminPanel/Accommodation/types";
import {
  accommodationFeatureList_key,
  accommodationFeatureList_url,
  accommodationTypes_key,
  accommodationTypes_url,
} from "@/data/querykeys";
import useGetData from "@/services/useGetData";
import type { accommodationFeatureList } from "../types/types";

const useAccommodation = () => {
  const accommodationTypes = useGetData<accommodationTypes[]>({
    key: [accommodationTypes_key],
    url: accommodationTypes_url,
  });

  const accommodatioFeatureList = useGetData<accommodationFeatureList[]>({
    key: [accommodationFeatureList_key],
    url: accommodationFeatureList_url,
  })
  return { accommodationTypes, accommodatioFeatureList };
};

export default useAccommodation;
