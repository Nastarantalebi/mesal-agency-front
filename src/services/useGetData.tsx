import axios from "axios";
import { useQuery } from "@tanstack/react-query";

interface Props{
    key: string[];
    url: string;
    enabled?: boolean;
}

function useGetData<T>({ key, url, enabled = true }: Props) {
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  return useQuery<T>({
    queryKey: key,
    enabled,
    queryFn: async () => {
      const res = await axios.get(BASE_URL + url);
      return res.data;
    },
    staleTime:5*60*1000
  });
}


export default useGetData;