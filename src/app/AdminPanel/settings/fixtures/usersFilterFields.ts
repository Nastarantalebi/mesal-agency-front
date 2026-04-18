import type { Items } from "@/components/form/FormInputTypes";
import type { createUsersList } from "../types";

export const userFields: Items<createUsersList>[] = [     
 {
    name: "mobile",
    label: "شماره موبایل",
    isRequired: false,
    fieldType: "input",
    inputType: "text",
    className:"max-w-50"
  },
 {
    name: "is_staff",
    label: "مدیر؟",
    isRequired: false,
    fieldType: "",
  },
]
