import type { TPaginatedResponse } from "@/types";
import useAccommoation from "../services/useAccommoation";
import type { accommodationsResponse, TprovinceBasedAccommodationList } from "../types";

const useProvinceBasedAccommodationList = () => {

  const currentPage = 1;

  const mashhad = useAccommoation({
    city__province__id: 109,
    city__id: 10900016,
  }, currentPage);

  console.log(mashhad.getAccommodations.data)

  const tehran = useAccommoation({
    city__province__id: 123,
  }, currentPage);

  console.log(tehran.getAccommodations.data)

  const esfahan = useAccommoation({
    city__province__id: 110,
  }, currentPage);

const emptyPaginated: TPaginatedResponse<accommodationsResponse> = {
  count: 0,
  next: null,
  previous: null,
  results: []
};


  const provinceBasedAccommodationList: TprovinceBasedAccommodationList[] = [
      {
          title: "اقامتگاه های شهر مشهد",
          city__province__id: 109,
          city__id: 10900016,
          accommodations: mashhad.getAccommodations.data ?? emptyPaginated,

      },
      {
          title: "اقامتگاه های شهر اصفهان",
          city__province__id: 123,
          accommodations: esfahan.getAccommodations.data ?? emptyPaginated,
      },
      {
          title: "اقامتگاه های شهر تهران",
          city__province__id: 110,
          accommodations: tehran.getAccommodations.data ?? emptyPaginated,
      },
  ]
  return {provinceBasedAccommodationList}
}

export default useProvinceBasedAccommodationList

