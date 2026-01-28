import type { Items } from "@/components/form/formInputTypes";
import useGetData from "@/services/useGetData";
import type { Item, TCreateAccomodation } from "@/app/AdminPanel/Accommodation/types/index";
import { accommodation_cities_key, accommodation_cities_url, accommodation_key, accommodation_proviences_key, accommodation_proviences_url, accommodation_types_url } from "@/data/querykeys";

function useAccomodationFields(province_id?: number) {
  const { data: accommodationTypes} = useGetData<Item[]>({
    key: [accommodation_key],
    url: accommodation_types_url,
  });

  const { data: provinces} = useGetData<Item[]>({
    key: [accommodation_proviences_key],
    url: accommodation_proviences_url,
  });


  const { data: cities } = useGetData<Item[]>({
    key: [accommodation_cities_key, String(province_id) ?? ""],
    url: `${accommodation_cities_url}?province_id=${province_id}`,
    enabled: !!province_id,
  });



  const accommodationFields: Items<TCreateAccomodation>[] = [
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
      name: "provience",
      label: "استان",
      isRequired: true,
      fieldType: "dropdown",
      options: provinces,
    },
    {
      name:"city",
      label: "شهر",
      isRequired: true,
      fieldType: "dropdown",
      options: cities,
    },
    {
      name: "description",
      label: "توضیحات",
      isRequired: true,
      fieldType: "input",
      inputType: "text"
    },

  ];
  return accommodationFields;
}

export default useAccomodationFields;
