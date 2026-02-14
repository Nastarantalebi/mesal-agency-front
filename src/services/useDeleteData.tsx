import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

interface Props {
  key: unknown[];
  url: string;
}

function useDeleteData<TResponse = void>({ key, url }: Props) {
  const BASE_URL = import.meta.env.VITE_BASE_URL as string;

  return useMutation<TResponse, AxiosError, { id: number | string }>({
    mutationKey: key,
    mutationFn: async ({ id }) => {
      const fullUrl = `${BASE_URL}${url}${id}/`;
      const { data } = await axios.delete<TResponse>(fullUrl);
      return data;
    },
  });
}

export default useDeleteData;