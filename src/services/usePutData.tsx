import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import type { Props } from "./types";
import { toast } from "sonner";


function usePutData<TRequest, TResponse>({ key, url, onSuccess, onError }: Props) {
  const queryClient = useQueryClient();
  const BASE_URL = import.meta.env.VITE_BASE_URL as string;
  
  return useMutation({
    mutationKey: key,
    mutationFn: async (body: TRequest) => {
      const full_url =`${BASE_URL}${url}/`;
      const { data } = await axios.put<TResponse>(full_url, body);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: key });
      
      if (onSuccess) {
        onSuccess();
      } else {
        toast.success("آیتم با موفقیت تغییر یافت.");
      }
    },
    onError: () => {
      if (onError) {
        onError();
      } else {
        toast.error("خطا در تغییر آیتم");
      }
      
    },
  });
}

export default usePutData;
