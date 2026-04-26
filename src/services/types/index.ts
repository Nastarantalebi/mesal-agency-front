
export type Props = {
  key: string[];
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