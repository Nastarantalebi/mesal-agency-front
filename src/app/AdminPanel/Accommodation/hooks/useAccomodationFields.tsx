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
      isRequired: true,
      fieldType: "dropdown",
      options: accommodationTypes,
      page:1,
    },
    {
      name: "name",
      label: "نام اقامتگاه",
      isRequired: true,
      fieldType: "input",
      inputType:"text",
      page:1,
    },
    {
      name: "provience",
      label: "استان",
      isRequired: false,
      fieldType: "dropdown",
      options: provinces,
      page:1,
    },
    {
      name:"city",
      label: "شهر",
      isRequired: false,
      fieldType: "dropdown",
      options: cities,
      page:1,
    },
    {
      name: "description",
      label: "توضیحات",
      isRequired: false,
      fieldType: "input",
      inputType: "text",
      className: "col-span-2",
      page:1,
    },
    {
      name:"address",
      label:"آدرس",
      isRequired: false,
      fieldType: "input",
      inputType: "text",
      className:"col-span-2",
      page:1,
    },
    {
      name:"manufacture_date",
      label: "سال تاسیس",
      isRequired: false,
      fieldType: "input",
      inputType: "number",
      page:2,
    },
    {
      name:"floors",
      label:"تعداد طبقات",
      isRequired:false,
      fieldType:"input",
      inputType: "number",
      page:2,
    },
    {
      name:"stars",
      label:"چند ستاره",
      isRequired:false,
      fieldType:"input",
      inputType: "number",
      page:2,
    },
    {
      name:"total_rooms",
      label: "تعداد کل اتاق ها",
      isRequired:false,
      fieldType:"input",
      inputType: "number",
      page:2,
    },
    {
      name:"check_in_time",
      label: "ساعت ورود",
      isRequired:false,
      fieldType:"input",
      inputType: "text",
      page:2,
    },
    {
      name:"check_out_time",
      label:"ساعت خروج",
      isRequired:false,
      fieldType:"input",
      inputType: "text",
      page:2,
    }

  ];
  return accommodationFields;
}

export default useAccomodationFields;
