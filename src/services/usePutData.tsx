import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import type { Props } from "./types";


function usePutData<TRequest, TResponse>({ key, url, id }: Props) {
  const BASE_URL = import.meta.env.VITE_BASE_URL as string;
  const full_url =
    id != null ? `${BASE_URL}${url}${id}/` : `${BASE_URL}${url}/`;
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [...key, id],
    mutationFn: async (body: TRequest) => {
      const { data } = await axios.put<TResponse>(full_url, body);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: key });
    },
  });
}

export default usePutData;
