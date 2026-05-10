import z from "zod";
import type { filterdata } from "../types/types";

export const filterValidation = z.object({
  name__contains: z.string().optional().nullable().optional(),
  city__province__id: z.number().optional().nullable().optional(),
  city__id: z.number().nullable().optional(),
  type__id: z.array(z.string().optional().nullable().optional()),
  stars__gte: z.number().optional().nullable().optional(),
  stars__lte: z.number().optional().nullable().optional(),
  feature__id: z.array(z.string().optional().nullable().optional()),
  // num_adults: z.number().optional().nullable(),
  // num_children: z.number().optional().nullable(),
  open_start__gte: z.string().optional().nullable(),
  open_end__lte: z.string().optional().nullable(),
});

export const filterInitialValues: filterdata = {
  name__contains: "",
  city__province__id: null,
  city__id: null,
  type__id: [],
  stars__gte: null,
  stars__lte: null,
  feature__id: [],
  open_start__gte: null,
  open_end__lte: null,
};
