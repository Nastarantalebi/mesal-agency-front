import { accommodation_key, accommodation_url } from "@/data/querykeys";
import useGetData from "@/services/useGetData";
import type { TPaginatedResponse } from "@/types";
import type { accommodationFilters, accommodationsResponse } from "../types";

const useAccommoation = (
  filters?: accommodationFilters,
  current_page?: number,
) => {
  const normalizedFilters: Record<string, string> = {
    name__contains: filters?.name__contains ?? "",
    type__id: filters?.type__id ? String(filters.type__id) : "",
    city__id: filters?.city__id ? String(filters.city__id) : "",
    city__province__id: filters?.city__province__id
      ? String(filters.city__province__id)
      : "",
    stars__gte: filters?.stars__gte ? String(filters.stars__gte) : "",
    stars__lte: filters?.stars__lte ? String(filters.stars__lte) : "",
    feature__id: filters?.feature__id ? String(filters.feature__id) : "",
  };

  const params = new URLSearchParams({
    page: String(current_page ?? 1),
    ...normalizedFilters,
  });

  const url = `${accommodation_url}?${params.toString()}`;
  const key = [
    accommodation_key,
    normalizedFilters.name__contains,
    normalizedFilters.type__id,
    normalizedFilters.city__id,
    normalizedFilters.city__province__id,
    normalizedFilters.stars__gte,
    normalizedFilters.stars__lte,
    normalizedFilters.feature__id,
  ];

  const getAccommodations = useGetData<
    TPaginatedResponse<accommodationsResponse>
  >({
    key,
    url,
    enabled: !!filters,
  });

  return { getAccommodations };
};

export default useAccommoation;
