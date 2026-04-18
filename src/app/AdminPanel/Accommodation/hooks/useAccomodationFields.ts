import {
  YES_NO_OPTIONS,
  type accommodationTypes,
  type cities,
  type provience,
  type TCreateAccomodation
} from "@/app/AdminPanel/Accommodation/types/index";
import type { Items } from "@/components/form/FormInputTypes";
import {
  accommodation_cities_key,
  accommodation_cities_url,
  accommodation_proviences_key,
  accommodation_proviences_url,
  accommodation_types_key,
  accommodation_types_url,
} from "@/data/querykeys";
import APIClient from "@/services/apiClient";
import { useQuery } from '@tanstack/react-query';

function useAccomodationFields(province_id?: number) {

  const apiClientTypes = new APIClient<accommodationTypes>(accommodation_types_url)
  const apiClientProvience = new APIClient<provience>(accommodation_proviences_url)
  const apiClientCities = new APIClient<cities>(`${accommodation_cities_url}?province_id=${province_id}`)

  const {data : accommodationTypes} = useQuery<accommodationTypes[], Error>({
    queryKey: [accommodation_types_key],
    queryFn: apiClientTypes.getAll,
  })

  const { data: provinces } = useQuery<accommodationTypes[], Error>({
    queryKey: [accommodation_proviences_key],
    queryFn: apiClientProvience.getAll,
  })

  const { data: cities } = useQuery<accommodationTypes[], Error>({
    queryKey: [accommodation_cities_key, String(province_id) ?? ""],
    queryFn: apiClientCities.getAll,
    enabled: !!province_id
  })

  const accommodationFields: Items<TCreateAccomodation>[] = [
    {
      name: "type",
      label: "نوع اقامتگاه",
      isRequired: true,
      fieldType: "dropdown",
      options: accommodationTypes,
    },
    {
      name: "name",
      label: "نام اقامتگاه",
      isRequired: true,
      fieldType: "input",
      inputType: "text",
    },
    {
      name: "provience",
      label: "استان",
      isRequired: false,
      fieldType: "dropdown",
      options: provinces,
    },
    {
      name: "city",
      label: "شهر",
      isRequired: false,
      fieldType: "dropdown",
      options: cities,
    },
    {
      name: "address",
      label: "آدرس",
      isRequired: false,
      fieldType: "input",
      inputType: "text",
      className: "col-span-full",
    },
    {
      name: "description",
      label: "توضیحات",
      isRequired: false,
      fieldType: "input",
      inputType: "text",
      className: "col-span-full",
    },
    {
      name: "open_start",
      label: "تاریخ شروع قرارداد",
      isRequired: true,
      fieldType: "DatePicker",
      className:"col-start-1"
    },
    {
      name: "open_end",
      label: "تاریخ پایان قرارداد",
      isRequired: true,
      fieldType: "DatePicker",
    },
    {
      name: "min_child_age",
      label: "حداقل سن کودک",
      isRequired: true,
      fieldType: "input",
      inputType:"number",
      direction:"ltr",
    },
    {
      name: "max_child_age",
      label: "حداکثر سن کودک",
      isRequired: true,
      fieldType: "input",
      inputType:"number",
      direction:"ltr",
    },
    {
      name: "manufacture_date",
      label: "سال تاسیس",
      isRequired: false,
      fieldType: "DatePicker",
    },
    {
      name: "floors",
      label: "تعداد طبقات",
      isRequired: false,
      fieldType: "input",
      direction:"ltr",
      inputType: "number",
    },
    {
      name: "total_rooms",
      label: "تعداد کل اتاق ها",
      isRequired: false,
      fieldType: "input",
      direction:"ltr",
      inputType: "number",
    },
    {
      name: "max_guests",
      label: "ماکزیمم تعداد مهمانان",
      isRequired: false,
      fieldType: "input",
      direction:"ltr",
      inputType: "number",
    },
    {
      name: "check_in_time",
      label: "ساعت ورود",
      isRequired: false,
      fieldType: "Time",
    },
    {
      name: "check_out_time",
      label: "ساعت خروج",
      isRequired: false,
      fieldType: "Time",
    },

    {
      name: "area_sqm",
      label: "مساحت",
      isRequired: false,
      fieldType: "input",
      direction:"ltr",
      inputType: "number",
    },
    {
      name: "stars",
      label: "چند ستاره",
      isRequired: false,
      fieldType: "input",
      direction:"ltr",
      inputType: "number",
      className: "col-start-1"
    },
    {
      name: "top",
      label: "ستاره برتر؟",
      isRequired: false,
      fieldType: "yesNoInput",
      options: YES_NO_OPTIONS,
    },
    {
      name: "has_reception_24h",
      label: "پذیرش ۲۴ ساعته ",
      isRequired: false,
      fieldType: "yesNoInput",
      options: YES_NO_OPTIONS,
      className: "col-start-1"
    },
    {
      name: "has_elevator",
      label: "آسانسور",
      isRequired: false,
      fieldType: "yesNoInput",
      options: YES_NO_OPTIONS,
    },
    {
      name: "built_with_local_materials",
      label: "ساخته شده با مصالح محلی",
      isRequired: false,
      fieldType: "yesNoInput",
      options: YES_NO_OPTIONS,
    },
    {
      name: "allows_local_food_experience",
      label: "اجازه تجربه غذای محلی",
      isRequired: false,
      fieldType: "yesNoInput",
      options: YES_NO_OPTIONS,
      className: "col-start-1"
    },
    {
      name: "is_active",
      label: "فعال",
      isRequired: false,
      fieldType: "yesNoInput",
      options: YES_NO_OPTIONS,
    },
        {
      name: "latitude", 
      label: "موقعیت مکانی",
      isRequired: false,
      fieldType: "Map",
      className: "col-span-full",
    },
  ];
  return {accommodationFields, provinces};
}

export default useAccomodationFields;
