import { useMutation } from "@tanstack/react-query";
import axios from "axios";

type Props = { key: unknown[]; url: string };

function usePostData<TRequest, TResponse>({ key, url }: Props) {
  const BASE_URL = import.meta.env.VITE_BASE_URL as string;

  return useMutation({
    mutationKey: key,
    mutationFn: async (body: TRequest) => {
      const { data } = await axios.post<TResponse>(BASE_URL + url, body);
      return data;
    },
  });
}

export default usePostData;
