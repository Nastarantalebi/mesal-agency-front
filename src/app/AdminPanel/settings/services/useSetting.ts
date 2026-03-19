import { default_key, default_url } from "@/data/querykeys";
import useGetData from "@/services/useGetData";
import usePostData from "@/services/usePostData";
import type { TCreateDefaults, TResponseDefaults } from "../types";

export const useAddDefaults = () => {
  
  const getDefaults = useGetData<TCreateDefaults>({
    key: [default_key],
    url: default_url,
  });

  const postDefaults = usePostData<TCreateDefaults, TResponseDefaults>({
    key: [default_key],
    url: default_url,
  });

  return {getDefaults, postDefaults}
}