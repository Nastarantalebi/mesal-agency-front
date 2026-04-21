import useSearch from "../services/useSearch";
import type { TprovinceBasedAccommodationList } from "../types";

const useProvinceBasedAccommodationList = () => {
  const mashhad = useSearch({
    start: "",
    end: "",
    num_adults: "",
    province: "109",
    city: "",
  });

  const tehran = useSearch({
    start: "",
    end: "",
    num_adults: "",
    province: "123",
    city: "",
  });

  const esfahan = useSearch({
    start: "",
    end: "",
    num_adults: "",
    province: "110",
    city: "",
  });
    const provinceBasedAccommodationList: TprovinceBasedAccommodationList[] = [
        {
            title: "اقامتگاه های محبوب شهر مشهد",
            accommodations: mashhad.getSearch.data ?? [],
        },
        {
            title: "اقامتگاه های محبوب شهر تهران",
            accommodations: tehran.getSearch.data ?? [],
        },
        {
            title: "اقامتگاه های محبوب شهر اصفهان",
            accommodations: esfahan.getSearch.data ?? [],
        },
    ]
  return {provinceBasedAccommodationList}
}

export default useProvinceBasedAccommodationList

