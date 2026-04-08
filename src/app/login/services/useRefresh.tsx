import { useMutation } from "@tanstack/react-query";
import { refresh } from "./authServices";
import type { LoginResponse } from "../types";
// import useAthenticate from "./useAthenticate";

function useRefresh() {
//   const { mutateAsync } = useAthenticate();

  return useMutation<LoginResponse, any>({
    mutationFn: async () => {
      const response = await refresh();
      return response;
    },
    // onSuccess: () => {
    //   mutateAsync({ mobile: "" });
    // },
    onError: (e) => {
      throw new Error(
        e.response.error ?? e.response.data.message ?? "ورود ناموفق بود",
      );
    },
  });
}

export default useRefresh;
