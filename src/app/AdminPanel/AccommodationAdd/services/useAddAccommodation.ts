import usePostData from "@/services/usePostData";
import type { TAccommodationResponse, TCreateAccomodation } from "../../Accommodation/types";
import { accommodation_key, accommodation_url } from "@/data/querykeys";
import usePutData from "@/services/usePutData";
import useGetData from "@/services/useGetData";

const useAddAccommodation = (accommodationId: number | undefined) => {

    const post = usePostData<
        TCreateAccomodation,
        TAccommodationResponse
    >({
        key: [accommodation_key],
        url: accommodation_url,
    });

    const put = usePutData<
        TCreateAccomodation,
        TAccommodationResponse
    >({
        key: [accommodation_key, String(accommodation_key)],
        url: `${accommodation_url}${accommodationId}`,
    });

    const get = useGetData<TAccommodationResponse>({
        key: [accommodation_key, String(accommodationId)],
        url: `${accommodation_url}${accommodationId}/`,
        enabled: !!accommodationId,
    });

    return {post, put , get}
}

export default useAddAccommodation

  