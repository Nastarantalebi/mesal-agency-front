import z from "zod";

export const accommodationFeatureListValidation = z.object({
  feature: z.array(z.number()).min(1, "لطفاً حداقل یک ویژگی را انتخاب کنید"),
});

export const accommodationFeatureListInitialValues = {
  feature: [],
};