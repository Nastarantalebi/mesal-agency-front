import { useMutation } from "@tanstack/react-query";
import axios from "axios";

type Props = { key: unknown[]; url: string; id?: string | number };

function usePutData<TRequest, TResponse>({ key, url, id }: Props) {
  const BASE_URL = import.meta.env.VITE_BASE_URL as string;
  const full_url = id != null ? `${BASE_URL}${url}${id}/` : `${BASE_URL}${url}/`;

  return useMutation({
    mutationKey: [...key, id],
    mutationFn: async (body: TRequest) => {
      const { data } = await axios.put<TResponse>(full_url, body);
      return data;
    },
  });
}

export default usePutData;
