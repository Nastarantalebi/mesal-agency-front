import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "./authServices";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async () => {
      const response = await logout();
      return response;
    },

    onSuccess: (data) => {
      queryClient.clear();
      localStorage.clear();
      toast.success(data?.message || "خروج موفق");
      navigate({to: "/login"});
    },

    onError: () => {
        toast.error("خروج ناموفق")
    }
  });

  return { isPending, mutateAsync };
}
