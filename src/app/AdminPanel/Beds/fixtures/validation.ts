import z from "zod"
import type { TCreateBed } from "../types"


export const bedValidation = z.object({
    name: z.string().min(1, "نام تخت الزامی است")
})

export const bedInitialValues: TCreateBed = {
    name: "",
}