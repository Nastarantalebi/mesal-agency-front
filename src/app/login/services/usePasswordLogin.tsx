import { useMutation } from "@tanstack/react-query";
import type { ILogingForm } from "../types";
import { useNavigate } from "@tanstack/react-router";
import { passwordLogin } from "./authServices";
import { toast } from "sonner";

function useSendPasswordLogin() {
  const navigate = useNavigate();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (values: ILogingForm) => {
      const response = await passwordLogin(values);
      return response;
    },
    onSuccess: (data) => {
      toast.success(data?.message || "ورود موفق");
      navigate({to: "/dashboard"});
    },
  });
  return { isPending, mutateAsync };
}

export default useSendPasswordLogin;
