import { useQuery } from "@tanstack/react-query";
import { meInfo } from "./authServices";
export type TMe = {
  avatar: string;
  mobile: string;
};
function useMe() {
  const { data, isLoading, refetch } = useQuery<TMe>({
    queryKey: ["meInfo"],
    queryFn: meInfo,
    retry: false,
    refetchOnWindowFocus: false,
  });

  return { data, isLoading, refetch };
}

export default useMe;
