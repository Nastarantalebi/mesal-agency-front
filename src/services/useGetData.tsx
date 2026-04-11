import { useQuery } from "@tanstack/react-query";
import type { Props } from "./types";
import { Request } from "@/lib/httpService";

function useGetData<T>({ key, url, enabled = true }: Props) {
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  return useQuery<T>({
    queryKey: key,
    enabled,
    queryFn: async () => {
      const res = await Request.get(BASE_URL + url);
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
    
  });
}

export default useGetData;
