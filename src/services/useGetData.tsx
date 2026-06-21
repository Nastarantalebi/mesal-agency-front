import { useQuery } from "@tanstack/react-query";
import { useSearch } from "@tanstack/react-router";
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
  const searchParams = useSearch({ strict: false }) as Record<string, any>;
  console.log(searchParams);

  return useQuery<T>({
    queryKey: [...key, searchParams],
    queryFn: async () => {
      const queryString = new URLSearchParams(
        Object.entries(searchParams).reduce(
          (acc, [key, value]) => {
            if (value !== undefined && value !== null) {
              acc[key] = String(value);
            }
            return acc;
          },
          {} as Record<string, string>,
        ),
      ).toString();

      const fullUrl = queryString
        ? `${BASE_URL}${url}?${queryString}`
        : `${BASE_URL}${url}`;

      const res = await Request.get(fullUrl);
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
