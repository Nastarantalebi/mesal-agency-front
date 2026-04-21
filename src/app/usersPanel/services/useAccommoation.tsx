import { accommodation_key, accommodation_url } from "@/data/querykeys"
import useGetData from "@/services/useGetData"
import { type accommodationsResponse, type accommodationFilters } from "../types"
import type { TPaginatedResponse } from "@/types"

const useAccommoation = (filters?: accommodationFilters, current_page?: number) => {

  const url = `${accommodation_url}?page=${current_page}`

    const getAccommodations = useGetData<TPaginatedResponse<accommodationsResponse>>({
        key: [accommodation_key],
        url: accommodation_url,
    })
  return {getAccommodations}
}

export default useAccommoation
