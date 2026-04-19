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

export type TprovinceBasedAccommodationList = {
    title: string;
    accommodations: accommodationSearchResponse[];
}

