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
    available_room_types?: number,
    city: {
        id: number,
        name: string,
        province: {
            id: number,
            name: string,
        }
    },
    price_from?: number

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
    images: {id: number, image:string, main:boolean}[];
    top: boolean;
    city: {
    id: number,
    name: string,
    province: {
        id: 0,
        name: string,
    }
    }
    price_from: number,
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
