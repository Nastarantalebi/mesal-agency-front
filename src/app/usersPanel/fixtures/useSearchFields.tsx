import type { Items } from "@/components/form/FormInputTypes";
import type { accommodationSearch } from "../types";
import useAccomodationFields from "@/app/AdminPanel/Accommodation/hooks/useAccomodationFields";

const useSearchFields = () => {
  // const {getProviences, getCities} = useLocation();
  const { provinces } = useAccomodationFields();

  console.log(provinces);

  const searchFields: Items<accommodationSearch>[] = [
    {
      name: "province",
      isRequired: false,
      fieldType: "dropdown",
      placeholder: "استان",
      options: provinces,
    },
    {
      name: "start",
      isRequired: false,
      fieldType: "DatePicker",
      placeholder: "تاریخ رفت",
    },
    {
      name: "end",
      isRequired: false,
      fieldType: "DatePicker",
      placeholder: "تاریخ برگشت",
    },
    {
      name: "num_adults",
      isRequired: false,
      fieldType: "input",
      inputType: "number",
      placeholder: "تعداد نفرات",
      direction: "rtl",
    },

  ];
  return { searchFields };
};

export default useSearchFields;
