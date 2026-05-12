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

// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { Request } from "../lib/httpService";
// import { toast } from "sonner";

// type TUpdateData = {
//   url: string;
//   key?: string | string[];
//   id?: number | string | null;
//   showToast?: boolean;
//   onSuccess?: () => void;
//   onError?: () => void;
// };

// export async function updateCase<TReq extends object, TRes>(
//   url: string,
//   values: TReq,
//   id?: number | string | null
// ) {
//   const finalUrl = id != null ? `${url}${id}/` : url;
//   const { data }: { data: TRes } = await Request.put(finalUrl, values);
//   return data;
// }

// function usePutData<TReq extends object, TRes>({
//   url,
//   key,
//   id,
//   showToast = true,
//   onSuccess,
//   onError,
// }: TUpdateData) {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: (values: TReq) => updateCase<TReq, TRes>(url, values, id),
//     onSuccess: () => {
//       if (onSuccess) {
//         onSuccess();
//       } else {
//         queryClient.invalidateQueries({ queryKey: [key] });
//         if (showToast)
//           toast.success("آیتم ویرایش شد")
//       }
//     },
//     onError: () => {
//       if (onError) {
//         onError();
//       }
//       else{
//         toast.error("خطا در ویرایش ایتم")
//       }
//     },
//   });
// }

// export default usePutData;


