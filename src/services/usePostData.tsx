import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import type { Props } from "./types";
import { toast } from "sonner";


function usePostData<TRequest, TResponse>({ key, url, onSuccess, onError }: Props) {
  const BASE_URL = import.meta.env.VITE_BASE_URL as string;
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: key,
    mutationFn: async (body: TRequest) => {
      const { data } = await axios.post<TResponse>(BASE_URL + url, body);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: key });

      if(onSuccess) {
        onSuccess();
      } else {
        toast.success("آیتم با موفقیت ثبت شد")
      }
    },

    onError: () => {
      if(onError){
        onError();
      } else {
        toast.error("خطا در ثبت آیتم")  
      }
    }
  });
}

export default usePostData;
