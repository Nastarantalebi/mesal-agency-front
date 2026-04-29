import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Props } from "./types";
import { toast } from "sonner";
import { Request } from "@/lib/httpService";

function usePutData<TRequest extends object>({
  key,
  url,
  onSuccess,
  onError,
}: Props) {
  const queryClient = useQueryClient();
  const BASE_URL = import.meta.env.VITE_BASE_URL as string;

  return useMutation({
    mutationKey: key,
    mutationFn: async (body: {data: TRequest, id: number } ) => {
      const full_url = `${BASE_URL}${url}${body.id}/`;
      const { data } = await Request.put(full_url, body.data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: key });

      if (onSuccess) {
        onSuccess();
      } else {
        toast.success("ویرایش آیتم با موفقیت انجام شد");
      }
    },
    onError: () => {
      if (onError) {
        onError();
      } else {
        toast.error("خطا در ویرایش آیتم");
      }
    },
  });
}

export default usePutData;
