import axios from "axios";
import { useQuery } from "@tanstack/react-query";

interface Props{
    key: string[];
    url: string;
}

function useGetData<T>({ key, url }: Props) {
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  return useQuery<T>({
    queryKey: key,
    queryFn: async () => {
      const res = await axios.get(BASE_URL + url);
      return res.data;
    },
  });
}


export default useGetData;