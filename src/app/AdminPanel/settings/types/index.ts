export type TCreateBed = {
    name: string,
}

export type TBedResponse = {
    id: number;
    name: string;
}

///////////////////////////////////////////////////////////////

export type TCFeature = {
    title: string;
    type: string;
    show_in_home_page: boolean;
}

export type TFeatureResponse = {
    id: number;
    title: string;
    type: string;
    show_in_home_page: boolean;
}

//////////////////////////////////////////////////////////

export type TCreateDefaults = {
    min_child_age: number;
    max_child_age: number;
    check_in_time: string;
    check_out_time: string;
}

export type TResponseDefaults = {
    min_child_age: number;
    max_child_age: number;
    check_in_time: string;
    check_out_time: string;
}

/////////////////////////////////////////////////////

export type UsersListResponse = {
    id: number;  
    mobile: string;
    is_staff: boolean;
};
export type createUsersList = {
    mobile: string;
    is_staff: boolean;
};
