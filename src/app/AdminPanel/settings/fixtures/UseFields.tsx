import type { TcreateUsersList } from "../types";
import type { Items } from "@/components/form/FormInputTypes";

const UseFields = () => {
  const fields: Items<TcreateUsersList>[] = [
    {
      name: "mobile",
      label: "موبایل",
      fieldType: "input",
      inputType: "number",
    },
    { name: "is_staff", label: "مدیر؟", fieldType: "yesNoInput" },
  ];
  return fields;
};

export default UseFields;
