import { useMutation } from "@tanstack/react-query";
import type { IForgotPassword } from "../types";
import { forgotPassword } from "./authServices";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";

function useForgotPassWord() {
  const navigate = useNavigate();
  return useMutation<any, any, IForgotPassword>({
    mutationFn: async (values) => {
      const response = await forgotPassword(values);
      return response;
    },
    onSuccess: async (data) => {
      toast.success(data.message);
      navigate({to: "/dashboard"});
    },
    onError: (e) => {
      throw new Error(
        e.response.error || e.response.data.message || "تغییر رمز ناموفق بود",
      );
    },
  });
}

export default useForgotPassWord;
