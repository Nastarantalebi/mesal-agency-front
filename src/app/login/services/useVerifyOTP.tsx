import { useMutation } from "@tanstack/react-query";
// import useAthenticate from "./useAthenticate";
import { verifyOTP } from "./authServices";
import type { ISendOTP, LoginResponse } from "../types";
import useRefresh from "./useRefresh";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

function useVerifyOTP() {
//   const queryClient = useQueryClient();
//   const { mutateAsync: handlerSubmit } = useAthenticate();
  const { mutateAsync: refresh } = useRefresh();
  const navigate = useNavigate()

  return useMutation<LoginResponse, any, ISendOTP>({
    mutationFn: async (values) => {
      const response = await verifyOTP(values);
      return response;
    },
    onError: (e) => {
      if (e.code === 403) {
        refresh();
      }
      throw new Error(
        e.response.error || e.response.data.message || "تایید کد ناموفق بود",
      );
    },
        onSuccess: (data) => {
      toast.success(data?.message || "ورود موفق");
      navigate({ to: "/admin/dashboard" })
    },
  });
}

export default useVerifyOTP;
