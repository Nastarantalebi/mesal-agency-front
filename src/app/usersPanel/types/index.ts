import type { TPaginatedResponse } from "@/types";

export type accommodationSearch = {
    start?: string;
    end?: string;
    num_adults?: string;
    city?: string;
    province?: string;
}
/////////////////////////////////////////

export type accommodationSearchResponse = {

    id: number,
    type: {
        id: number,
        name: string,
    },
    name: string,
    stars: number,
    available_room_types: number,
    city: {
        id: number,
        name: string,
        province: {
            id: number,
            name: string,
        }
    }

}

/////////////////////////////////////////

export type homePageFeaturesResponse = {
    id: number;
    title: string;
}[]

/////////////////////////////////////////

export type accommodationsResponse = {
    id: number;
    type: string;
    name: string;
    stars: number;
    images: string[];
    top: boolean;
}

export type TprovinceBasedAccommodationList = {
    title: string;
    city__id?: number;
    city__province__id: number;
    accommodations: TPaginatedResponse<accommodationsResponse>;
}

export type accommodationFilters =  {
    name__contains?: string;
    type__id?: number;
    city__id?: number;
    city__province__id?: number;
    stars__gte?: number;
    stars__lte?: number;
    feature__id?: number; 
}
