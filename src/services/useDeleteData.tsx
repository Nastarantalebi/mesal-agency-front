import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

interface Props {
  key: string[];
  url: string;
  onSuccess?: () => void;
  onError?: (error: AxiosError) => void;
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
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: key });
      
      if (onSuccess) {
        onSuccess();
      } else {
        const message = (data as DeleteResponse)?.message || "آیتم با موفقیت حذف شد";
        toast.success(message);
      }
    },
    onError: (error) => {
      const errorData = error.response?.data as any;
      const message =
        errorData?.message || 
        errorData?.detail || 
        error.message || 
        "خطا در حذف آیتم";
      toast.error(message);

      if (onError) {
        onError(error);
      }
    },
  });
}

export default useDeleteData;