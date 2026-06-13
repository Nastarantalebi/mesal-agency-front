import {
  YES_NO_OPTIONS,
  type TCreateAccomodation
} from "@/app/AdminPanel/Accommodation/types/index";

import useAdminLocation from "../services/useAdminLocation";
import { useAccommodation } from "../services/useAccommodation";
import type { TFormData } from "@/types";
import { mapTOption2ToTOption } from "@/utils/formValues";

function useAccomodationFields(province_id: number) {

  const {getAccommodationTypes} = useAccommodation()
  const { getAdminProviences, getAdminCities } = useAdminLocation(province_id)

  const accommodationTypes = mapTOption2ToTOption(getAccommodationTypes.data!);
  const proviences = mapTOption2ToTOption(getAdminProviences.data!)
  const cities = getAdminCities.data 
    ? mapTOption2ToTOption(getAdminCities.data) 
    : [];

  const accommodationFields: TFormData<TCreateAccomodation>[] = [
    {
      name: "type",
      label: "نوع اقامتگاه",
      required: true,
      type:"select",
      option: accommodationTypes,
      // option: getAccommodationTypes.data,
    },
    {
      name: "name",
      label: "نام اقامتگاه",
      required: true,
      inputType: "text",
    },
    {
      name: "provience",
      label: "استان",
      required: false,
      type: "select",
      option:proviences,
      // option: getAdminProviences.data,
    },
    {
      name: "city",
      label: "شهر",
      required: false,
      type: "select",
      option: cities ?? [],
    },
    {
      name: "open_start",
      label: "تاریخ شروع قرارداد",
      required: true,
      type: "date",
      className:""
    },
    {
      name: "open_end",
      label: "تاریخ پایان قرارداد",
      required: true,
      type: "date",
    },
    {
      name: "min_child_age",
      label: "حداقل سن کودک",
      required: true,
      inputType:"number",
    },
    {
      name: "max_child_age",
      label: "حداکثر سن کودک",
      required: true,
      inputType:"number",
    },
    {
      name: "manufacture_date",
      label: "سال تاسیس",
      required: false,
      type: "date",
    },
    {
      name: "floors",
      label: "تعداد طبقات",
      required: false,
      inputType: "number",
    },
    {
      name: "total_rooms",
      label: "تعداد کل اتاق ها",
      required: false,
      inputType: "number",
    },
    {
      name: "max_guests",
      label: "ماکزیمم تعداد مهمانان",
      required: false,
      inputType: "number",
    },
    {
      name: "check_in_time",
      label: "ساعت ورود",
      required: false,
      type: "time",
    },
    {
      name: "check_out_time",
      label: "ساعت خروج",
      required: false,
      type: "time",
    },
    
    {
      name: "area_sqm",
      label: "مساحت",
      required: false,
      inputType: "number",
    },
    {
      name: "stars",
      label: "چند ستاره",
      required: false,
      inputType: "number",
      className: ""
    },
    {
      name: "top",
      label: "ستاره برتر؟",
      required: false,
      type: "select",
      option: YES_NO_OPTIONS,
    },
    {
      name: "has_reception_24h",
      label: "پذیرش ۲۴ ساعته ",
      required: false,
      type: "select",
      option: YES_NO_OPTIONS,
      className: ""
    },
    {
      name: "has_elevator",
      label: "آسانسور",
      required: false,
      type: "select",
      option: YES_NO_OPTIONS,
    },
    {
      name: "built_with_local_materials",
      label: "ساخته شده با مصالح محلی",
      required: false,
      type: "select",
      option: YES_NO_OPTIONS,
    },
    {
      name: "allows_local_food_experience",
      label: "اجازه تجربه غذای محلی",
      required: false,
      type: "select",
      option: YES_NO_OPTIONS,
      className: ""
    },
    {
      name: "is_active",
      label: "فعال",
      required: false,
      type: "select",
      option: YES_NO_OPTIONS,
    },
    {
      name: "address",
      label: "آدرس",
      required: false,
      type:"textArea",
      // className: "col-span-full",
    },
    {
      name: "description",
      label: "توضیحات",
      required: false,
      type: "textArea",
      className: " col-start-1",
    },
    //     {
      //   name: "latitude", 
      //   label: "موقعیت مکانی",
      //   required: false,
      //   type: "map",
      //   className: "col-span-full",
      // },
    ];
    return {accommodationFields};
  }
  
  export default useAccomodationFields;
