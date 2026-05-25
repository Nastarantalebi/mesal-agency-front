import type { Items } from "@/components/form/FormInputTypes";
import type { TcreateUsersList } from "../types";

export const userFields: Items<TcreateUsersList>[] = [     
 {
    name: "mobile",
    label: "شماره موبایل",
    isRequired: false,
    fieldType: "input",
    inputType: "text",
    // className:"w-fit"
  },
 {
    name: "is_staff",
    label: "مدیر؟",
    isRequired: false,
    fieldType: "yesNoInput",
  },
]
