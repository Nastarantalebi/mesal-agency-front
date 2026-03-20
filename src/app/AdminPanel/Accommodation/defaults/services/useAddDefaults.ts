import usePostData from "@/services/usePostData";
import type { TCreateDefaults, TResponseDefaults } from "../types";
import { default_key, default_url } from "@/data/querykeys";
import useGetData from "@/services/useGetData";

export const useAddDefaults = () => {

  const post = usePostData<TCreateDefaults, TResponseDefaults>({
    key: [default_key],
    url: default_url,
  });

  const get = useGetData<TCreateDefaults>({
    key: [default_key],
    url: default_url,
  });

  return {post, get}
}
