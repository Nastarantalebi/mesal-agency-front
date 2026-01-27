import type { Items } from "@/components/form/formInputTypes";
import useGetData from "@/services/useGetData";
import type { Item } from "@/components/form/CustomCombobox";

function useAccomodationFields() {
  const { data: accommodationTypes} = useGetData<Item[]>({
    key: ["accommodation-types"],
    url: "admin/accommodation_types",
  });

  const { data: provinces} = useGetData<Item[]>({
    key: ["provinces"],
    url: "admin/proviences",
  });



  const accommodationFields: Items[] = [
    {
      name: "type",
      label: "نوع اقامتگاه",
      isRequired: false,
      fieldType: "dropdown",
      options: accommodationTypes,
    },
    {
      name: "name",
      label: "نام اقامتگاه",
      isRequired: true,
      fieldType: "input",
      inputType:"text"
    },
    {
      name: "province",
      label: "استان",
      isRequired: true,
      fieldType: "dropdown",
      options: provinces,
    },
    {
      name: "phone number",
      label: "شماره تلفن",
      isRequired: true,
      fieldType: "input",
      inputType: "number"
    },
  ];
  return accommodationFields;
}

export default useAccomodationFields;
