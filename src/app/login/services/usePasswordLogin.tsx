import { useMutation } from "@tanstack/react-query";
import type { ILogingForm, LoginResponse } from "../types";
import { passwordLogin } from "./authServices";
import useRefresh from "./useRefresh";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";

function usePasswordLogin() {
  const navigate = useNavigate();

  const { mutateAsync: refresh } = useRefresh();

  return useMutation<LoginResponse, any, ILogingForm>({
    mutationFn: async (values) => {
      const response = await passwordLogin(values);
      return response;
    },
    onSuccess: async (data) => {
      toast.success(data?.message || "ورود موفق");
      navigate({to: "/dashboard"});

    },
    onError: (e) => {
      if (e.code === 403) {
        refresh();
      }
      throw new Error(
        e.response.error || e.response.data.message || "ورود ناموفق بود",
      );
    },
  });
}

export default usePasswordLogin;
