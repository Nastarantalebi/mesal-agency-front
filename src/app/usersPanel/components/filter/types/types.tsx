import type { ReactNode } from "react";
import type z from "zod";
import type { filterValidation } from "../fixtures/Validation";

export type filter = {
  title: string;
  content: ReactNode;
};

export type accommodationFeatureList = {
  id: number;
  title?: string;
  name?: string;
};

export type filterdata = z.infer<typeof filterValidation>;
