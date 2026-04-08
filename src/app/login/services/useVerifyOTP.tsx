import { useMutation, useQueryClient } from "@tanstack/react-query";
// import useAthenticate from "./useAthenticate";
import { verifyOTP } from "./authServices";
import type { ISendOTP, LoginResponse } from "../types";
import useRefresh from "./useRefresh";

function useVerifyOTP() {
//   const queryClient = useQueryClient();
//   const { mutateAsync: handlerSubmit } = useAthenticate();
  const { mutateAsync: refresh } = useRefresh();

  return useMutation<LoginResponse, any, ISendOTP>({
    mutationFn: async (values) => {
      const response = await verifyOTP(values);
      return response;
    },
    // onSuccess: async (data) => {
    //   queryClient.setQueryData(["auth", "user"], data.user.mobile);
    //   handlerSubmit({ mobile: data.user.mobile });
    // },
    onError: (e) => {
      if (e.code === 403) {
        refresh();
      }
      throw new Error(
        e.response.error || e.response.data.message || "تایید کد ناموفق بود",
      );
    },
  });
}

export default useVerifyOTP;
