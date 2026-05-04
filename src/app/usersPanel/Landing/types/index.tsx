import type { ReactNode } from "react";

export type TData = {
  services: {
    data: { name: string; icon: ReactNode; className?: string }[];
  };
};
