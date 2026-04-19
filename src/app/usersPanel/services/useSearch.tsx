import useGetData from "@/services/useGetData";
import { search_key, search_url } from "@/data/querykeys";
import type { accommodationSearch, accommodationSearchResponse } from "../types";

const useSearch = (filters: accommodationSearch) => {
  const url = `${search_url}?start=${filters.start}&end=${filters.end}&num_adults=${filters.num_adults}&province=${filters.province}`;
  const key = [
    search_key,
    filters.start!,
    filters.end!,
    filters.num_adults!,
    filters.province!,
  ];

  const getSearch = useGetData<accommodationSearchResponse[]>({
    key,
    url,
    enabled: !!filters.city || !!filters.province
  });

  return { getSearch };
};

export default useSearch;
