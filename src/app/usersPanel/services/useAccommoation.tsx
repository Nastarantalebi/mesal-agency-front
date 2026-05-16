import { accommodation_key, accommodation_url } from "@/data/querykeys";
import useGetData from "@/services/useGetData";
import type { accommodationsResponse } from "../types";
import type { TPaginatedResponse } from "@/types";
import { useSearch } from "@tanstack/react-router";

export const useAccommodation = (current_page?: number) => {
  const search = useSearch({ from: "/search" });

  // Build query string from search object
  const params = new URLSearchParams();
  
  Object.entries(search).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      params.append(key, String(value));
    }
  });

  if (current_page) {
    params.append('page', String(current_page));
  }

  const queryString = params.toString();
  const url = `${accommodation_url}${queryString ? `?${queryString}` : ''}`;

  console.log("url:", url);

  const key = [accommodation_key, queryString, current_page];

  const getAccommodations = useGetData<TPaginatedResponse<accommodationsResponse>>({
    key,
    url,
  });

  return { getAccommodations };
};
