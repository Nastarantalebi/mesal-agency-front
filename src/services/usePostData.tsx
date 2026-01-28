import axios from "axios";
import { useMutation } from "@tanstack/react-query";

interface Props{
    key: string[];
    url: string;
}

function usePostData<TRequest, TResponse>({ key, url }: Props) {
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  return useMutation({
    mutationKey: key,
    mutationFn: async (body:TRequest) => {
      const {res}: {res:TResponse} = await axios.post(BASE_URL + url, body);
      return res;
    },
  });
}


export default usePostData;

