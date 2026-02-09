import z, { string } from "zod";
import type { TCFeature } from "../types";

export const FeaturesValidation = z.object({
  title: z.string().min(1, "نام ویژگی الزامی است"),
  type: z.string().min(1, "نوع الزامی است"),
});

export const FeaturesInitialValues: TCFeature = {
  title: "",
  type: "",
};
