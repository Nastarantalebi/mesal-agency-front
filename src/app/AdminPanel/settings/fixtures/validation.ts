import z from "zod"
import type { TCFeature, TCreateBed } from "../types"


export const bedValidation = z.object({
    name: z.string().min(1, "نام تخت الزامی است")
})

export const bedInitialValues: TCreateBed = {
    name: "",
}

////////////////////////////////////////////////////////

export const FeaturesValidation = z.object({
  title: z.string().min(1, "نام ویژگی الزامی است"),
  type: z.string().min(1, "نوع الزامی است"),
});

export const FeaturesInitialValues: TCFeature = {
  title: "",
  type: "",
};