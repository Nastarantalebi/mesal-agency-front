import { useQuery } from "@tanstack/react-query";
import { Request } from "../lib/httpService";

type TGetData = {
  url: string;
  key: string | string[];
  id?: number | string | null;
  enabled?: boolean;
};

async function getdata<T>(url: string, id?: number | string | null) {
  const { data }: { data: T } = await Request.get(id ? url + id + "/" : url);
  return data;
}

function useGetById<T>({ url, key, id, enabled = !!id }: TGetData) {
  return useQuery({
    queryKey: [key, id],
    queryFn: () => getdata<T>(url, id),
    enabled,
    refetchOnWindowFocus: false,
  });
}

export default useGetById;

