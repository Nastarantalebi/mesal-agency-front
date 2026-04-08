import { useMutation } from "@tanstack/react-query";
import { requestOTP } from "./authServices";
import type { IOTPResponse, ISendMobile } from "../types";

function useRequestOTP() {
  return useMutation<IOTPResponse, any, ISendMobile>({
    mutationFn: async (values) => {
      const response = await requestOTP(values);
      return response;
    },

    onError: (e) => {
      throw new Error(
        e.response.error || e.response.data.message || "درخواست کد ناموفق بود",
      );
    },
  });
}

export default useRequestOTP;
