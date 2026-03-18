import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

interface Props {
  key: string[];
  url: string;
  onSuccess?: () => void;
  onError?: () => void;
}

interface DeleteResponse {
  message?: string;
}

function useDeleteData<TResponse = DeleteResponse>({
  key,
  url,
  onSuccess,
  onError,
}: Props) {
  const queryClient = useQueryClient();
  const BASE_URL = import.meta.env.VITE_BASE_URL as string;

  return useMutation<TResponse, AxiosError, { id: number | string }>({
    mutationKey: key,
    mutationFn: async ({ id }) => {
      const fullUrl = `${BASE_URL}${url}${id}/`;
      const { data } = await axios.delete<TResponse>(fullUrl);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: key });
      
      if (onSuccess) {
        onSuccess();
      } else {
        toast.success("آیتم با موفقیت حذف شد");
      }
    },
    onError: () => {
      if (onError) {
        onError();
      } else {
        toast.error("خطا در حذف آیتم");
      }
      
    },
  });
}

export default useDeleteData;