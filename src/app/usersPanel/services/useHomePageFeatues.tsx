import useGetData from "@/services/useGetData";
import type {  homePageFeaturesResponse } from "../types";
import { homePageFeatures_key, homePageFeatures_url } from "@/data/querykeys";

const useHomePageFeatues = () => {

  const getHomePageFeatures = useGetData<homePageFeaturesResponse>({
    key: [homePageFeatures_key],
    url: homePageFeatures_url,
  });
  return {getHomePageFeatures};
};

export default useHomePageFeatues;
