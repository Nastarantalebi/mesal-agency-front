import { useMutation } from "@tanstack/react-query";
import type { ISendOTP } from "../types";
import { login } from "./authServices";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";
function useOTPLogin() {
  const navigate = useNavigate();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (values: ISendOTP) => {
      const response = await login(values);
      return response;
    },
    onSuccess: (data) => {
      toast.success(data?.message || "ورود موفق");
      navigate({ to: "/dashboard" })
    },
  });
  return { isPending, mutateAsync };
}
export default useOTPLogin;
