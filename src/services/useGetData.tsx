import { useQuery } from "@tanstack/react-query";
import type { Props } from "./types";
import { Request } from "@/lib/httpService";
const BASE_URL = import.meta.env.VITE_BASE_URL;

function useGetData<T>({
  key,
  url,
  enabled = true,
  gcTime,
  staleTime,
  refetchOnMount,
  refetchOnWindowFocus,
}: Props) {
  return useQuery<T>({
    queryKey: key,
    queryFn: async () => {
      const res = await Request.get(BASE_URL + url);
      return res.data;
    },
    enabled,
    staleTime: staleTime ? staleTime : 5 * 60 * 1000,
    gcTime: gcTime,
    refetchOnMount: refetchOnMount,
    refetchOnWindowFocus: refetchOnWindowFocus,
  });
}

export default useGetData;
