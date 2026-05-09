import type { QueryKey } from "@tanstack/react-query";

export type Props = {
  key: QueryKey;
  url: string;
  id?: string | number;
  enabled?: boolean;
  onSuccess?: () => void;
  onError?: () => void;
  gcTime?: number;
  staleTime?: number;
  refetchOnWindowFocus?: boolean;
  refetchOnMount?: boolean,
};