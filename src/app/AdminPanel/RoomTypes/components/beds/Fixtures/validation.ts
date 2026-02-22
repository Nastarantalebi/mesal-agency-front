import z from "zod";

export const bedListValidation = z.object({
  beds: z.array(
    z.object({
      bed: z.number(),
      number: z.number().min(1),
    })
  ),
});

export const badListInitialValues = {
  beds: [],
};

export type TBedListForm = z.infer<typeof bedListValidation>;