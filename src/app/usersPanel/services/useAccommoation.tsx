import { accommodation_key, accommodation_url } from "@/data/querykeys";
import useGetData from "@/services/useGetData";
import type { accommodationsResponse } from "../types";
import type { TPaginatedResponse } from "@/types";
import type { filterdata } from "../components/filter/types/types";

export const useAccommoation = (
  filters?: filterdata,
  current_page?: number,
) => {

  const params = new URLSearchParams();

  params.set("page", String(current_page ?? 1));

  if (filters?.name__contains)
    params.set("name__contains", filters.name__contains);

  if (filters?.city__id) params.set("city__id", String(filters.city__id));

  if (filters?.city__province__id)
    params.set("city__province__id", String(filters.city__province__id));

  if (filters?.stars__gte) params.set("stars__gte", String(filters.stars__gte));

  if (filters?.stars__lte) params.set("stars__lte", String(filters.stars__lte));

if (Array.isArray(filters?.type__id) && filters.type__id.length > 0) {
  params.set("type__id", filters.type__id.join(","));
}

if (Array.isArray(filters?.feature__id) && filters.feature__id.length > 0) {
  params.set("feature__id", filters.feature__id.join(","));
}


  const url = `${accommodation_url}?${params.toString()}`;


  const key = [accommodation_key, params.toString(), current_page, "KJKJK"];

  const getAccommodations = useGetData<
    TPaginatedResponse<accommodationsResponse>
  >({
    key,
    url,
    enabled: !!filters,
  });

  return { getAccommodations };
};
