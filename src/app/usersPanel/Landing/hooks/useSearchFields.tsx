import type { Items } from "@/components/form/FormInputTypes";
import type { accommodationSearch } from "../../types";
import useLocation from "../../services/useLocation";

const useSearchFields = () => {
  const { getProviences } = useLocation();

  const searchFields: Items<accommodationSearch>[] = [
    {
      name: "province",
      isRequired: false,
      fieldType: "dropdown",
      placeholder: "استان",
      items: getProviences.data,
      className: "border-gray-200 placeholder:text-red-500!",
    },
    {
      name: "start",
      isRequired: false,
      fieldType: "DatePicker",
      placeholder: "تاریخ رفت",
      className: "border-gray-200",
    },
    {
      name: "end",
      isRequired: false,
      fieldType: "DatePicker",
      placeholder: "تاریخ برگشت",
      className: "border-gray-200",
    },
    {
      name: "num_adults",
      isRequired: false,
      fieldType: "input",
      inputType: "number",
      placeholder: "تعداد نفرات",
      direction: "rtl",
      className: "border-gray-200 placeholder:text-gray-500!",
    },
  ];
  return { searchFields };
};

export default useSearchFields;
