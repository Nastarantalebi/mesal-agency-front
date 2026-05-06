import z from "zod";
import type { filterdata } from "../types/types";

export const filterValidation = z.object({
  name__contains: z.string().optional(),
  city__province__id: null,
  city__id: z.number().optional().nullable(),
  type__id: z.number().optional().nullable(),
  stars__gte: z.number().optional().nullable(),
  stars__lte: z.number().optional().nullable(),
  feature__id: z.number().optional().nullable(),
  // num_adults: z.number().optional().nullable(),
  // num_children: z.number().optional().nullable(),
  // start: z.date().optional().nullable(),
  // end: z.date().optional().nullable(),
});

export const filterInitialValues: filterdata = {
  name__contains: "",
  city__province__id: null,
  city__id: null,
  type__id: null,
  stars__gte: null,
  stars__lte: null,
  feature__id: null,
  // start: null,
  // end: null,
  };
