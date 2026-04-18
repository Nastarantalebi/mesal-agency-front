import { useMutation } from "@tanstack/react-query";
import { refresh } from "./authServices";
import type { LoginResponse } from "../types";
import { useNavigate } from "@tanstack/react-router";
// import useAthenticate from "./useAthenticate";

function useRefresh() {
  //   const { mutateAsync } = useAthenticate();
  const navigate = useNavigate();

  return useMutation<LoginResponse, any>({
    mutationFn: async () => {
      const response = await refresh();
      return response;
    },
    onSuccess: () => {navigate({to: "/dashboard"})},
    onError: (e) => {
      throw new Error(
        e.response.error ?? e.response.data.message ?? "ورود ناموفق بود",
      );
    },
  });
}

export default useRefresh;
